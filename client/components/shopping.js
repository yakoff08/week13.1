import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from './header'
import { removeSelection } from '../redux/reducers/products'

// import Cards from './cards'
// import { getProducts, getRates } from '../redux/reducers/products'

const Shop = () => {
  const dispatch = useDispatch()
  const base = useSelector((store) => store.products.base)
  const rates = useSelector((store) => store.products.rates)
  const cards = useSelector((store) => store.products.cards)
  const basket = useSelector((store) => store.products.basket)
  const selection = useSelector((store) => store.products.selection)
  const getPrice = (id) => cards.find((it) => it.id === id).price
  const baskArray = Object.values(basket)
  const numberOfItems = Object.values(selection).reduce((acc, rec) => acc + rec, 0)
  const sum = Object.entries(selection).reduce(
    (acc, rec) => acc + getPrice(rec[0]) * rec[1] * (rates[base] || 1),
    0
  )
  return (
    <div>
      <Header />
      <div className="flex flex-wrap content-center justify-center">
        {baskArray.map((card) => {
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
              <div className="flex justify-between">
                {' '}
                <button
                  className="bg-gray-300 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded-full"
                  type="button"
                  onClick={() => dispatch(removeSelection(card.id))}
                >
                  -
                </button>
                <div>{selection[card.id] || 0}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex p-2 justify-center">
        <div>SuM {sum !== 0 && sum.toFixed(2)}</div>
        <div className="px-2">Value {numberOfItems !== 0 && numberOfItems}</div>
      </div>
    </div>
  )
}

Shop.propTypes = {}

export default Shop
