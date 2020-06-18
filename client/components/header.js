/* eslint-disable react/button-has-type */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setBase, setStatus } from '../redux/reducers/products'

const Header = () => {
  const dispatch = useDispatch()
  const base = useSelector((store) => store.products.base)
  const rates = useSelector((store) => store.products.rates)

  const cards = useSelector((store) => store.products.cards)
  const selection = useSelector((store) => store.products.selection)
  const getPrice = (id) => cards.find((it) => it.id === id).price
  const numberOfItems = Object.values(selection).reduce((acc, rec) => acc + rec, 0)
  const sum = Object.entries(selection).reduce(
    (acc, rec) => acc + getPrice(rec[0]) * rec[1] * (rates[base] || 1),
    0
  )

  return (
    <nav className="bg-gray-500">
      <div className="flex justify-around">
        <div>
          <button
            className="bg-gray-300 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded-full"
            type="button"
          >
            <Link to="/">Main Page</Link>
          </button>
          <button
            className="bg-gray-300 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded-full"
            type="button"
          >
            <Link to="/logs">LOGS</Link>
          </button>
        </div>
        <div>
          {['CAD', 'USD', 'EUR'].map((it) => {
            return (
              <button
                key={it}
                type="button"
                className={`bg-gray-300 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded ${
                  base === it ? 'underline' : ''
                }`}
                onClick={() => {
                  dispatch(setBase(it))
                }}
              >
                {it}
              </button>
            )
          })}
        </div>
        <div className="justify-around">
          <button
            className="bg-gray-300 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded-l"
            type="button"
            onClick={() => {
              dispatch(setStatus('price'))
            }}
          >
            BY PRICE
          </button>
          <button
            className="bg-gray-300 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded-r"
            type="button"
            onClick={() => {
              dispatch(setStatus('title'))
            }}
          >
            BY NAME
          </button>
        </div>
        <button
          type="button"
          className="bg-gray-300 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded-full"
        >
          <Link to="/shopping">Basket</Link>
        </button>
        <div>
          <div>SuM {sum !== 0 && sum.toFixed(2)}</div>
          <div>Value {numberOfItems !== 0 && numberOfItems}</div>
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {}

export default Header
