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
  // const cards = useSelector((store) => store.products.cards)
  const basket = useSelector((store) => store.products.basket)
  const selection = useSelector((store) => store.products.selection)
  const baskArray = Object.values(basket)
  return (
    <div>
      <Header />
      <div className="flex flex-wrap content-center justify-center">
        {baskArray.map((card) => {
          return (
            <div
              className="border-2 flex flex-col border-solid border-black w-64 h-64 p-2 m-4"
              key={card.id}
            >
              <div className="flex justify-center">
                <img className="h-32" src={card.image} alt={card.title} />
              </div>
              <div>{card.title}</div>
              <div>
                {(card.price * (rates[base] || 1)).toFixed(2)} {base}{' '}
              </div>
              <div className="flex p-10 justify-between">
                {/* {' '} */}
                <button
                  className="bg-gray-300 hover:bg-blue-200 text-gray-800 font-bold px-4 rounded-full"
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
    </div>
  )
}

Shop.propTypes = {}

export default Shop
