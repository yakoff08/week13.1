import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addSelection, removeSelection, sortItem } from '../redux/reducers/products'
// import Header from './header'

const Cards = () => {
  const dispatch = useDispatch()
  const base = useSelector((store) => store.products.base)
  const rates = useSelector((store) => store.products.rates)
  const cards = useSelector((store) => store.products.cards)
  const status = useSelector((store) => store.products.status)
  const selection = useSelector((store) => store.products.selection)

  return (
    <div>
      <Link to="/">/Main</Link>
      <div className="flex flex-wrap content-center justify-center">
        {sortItem(cards, status).map((card) => {
          return (
            <div
              className="border-2 flex flex-col border-solid border-gray-500 rounded-lg w-64 h-64 p-2 m-4"
              key={card.id}
            >
              <div className="flex justify-center">
                <img
                  className="h-40 w-full object-cover object-center p-4"
                  src={card.image}
                  alt={card.title}
                />
              </div>
              <div>{card.title}</div>
              <div>
                {(card.price * (rates[base] || 1)).toFixed(2)} {base}{' '}
              </div>
              <div className="flex p-4 justify-between">
                {' '}
                <button
                  className="bg-gray-300 hover:bg-blue-200 text-gray-800 font-bold px-4 rounded-full"
                  type="button"
                  onClick={() => dispatch(removeSelection(card.id))}
                >
                  -
                </button>
                <div>{selection[card.id] || 0}</div>
                <button
                  className="bg-gray-300 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded-full"
                  type="button"
                  onClick={() => dispatch(addSelection(card.id, card))}
                >
                  +
                </button>{' '}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Cards
