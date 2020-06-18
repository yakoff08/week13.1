import axios from 'axios'

const GET_PRODUCTS = '@@GET_PRODUCTS'
const ADD_TO_SELECTION = 'ADD_TO_SELECTION'
const REMOVE_FROM_SELECTION = 'REMOVE_FROM_SELECTION '
const GET_RATES = '@@GET_RATES'
const SET_BASE = 'SET_BASE'
const SET_STATUS = 'SET_STATUS'
const GET_LOGS = 'GET_LOGS'

const initialState = {
  cards: [],
  selection: {},
  rates: {},
  basket: [],
  status: '',
  logs: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_SELECTION: {
      return {
        ...state,
        selection: {
          ...state.selection,
          [action.id]: (state.selection[action.id] || 0) + 1
        },
        basket: {
          ...state.basket,
          [action.id]: action.basket
        }
      }
    }
    case REMOVE_FROM_SELECTION: {
      const newSelection = {
        ...state.selection,
        [action.id]: state.selection[action.id] - 1
      }
      const newBasketItem = {
        ...state.basket,
        [action.id]: action.basket
      }
      if (newSelection[action.id] <= 0 || newBasketItem[action.id] <= 0) {
        delete newSelection[action.id]
        delete newBasketItem[action.id]
      }
      return {
        ...state,
        selection: newSelection,
        basket: newBasketItem
      }
    }
    case GET_RATES:
      return { ...state, ...action.rates }

    case GET_LOGS:
      return { ...state, logs: action.logs }

    case SET_BASE:
      return { ...state, base: action.base }

    case GET_PRODUCTS:
      return { ...state, cards: action.cards }

    case SET_STATUS:
      return { ...state, status: action.status }

    default:
      return state
  }
}

export function addSelection(id, basket) {
  return { type: ADD_TO_SELECTION, id, basket }
}

export function removeSelection(id, basket) {
  return { type: REMOVE_FROM_SELECTION, id, basket }
}

export function setBase(base) {
  return { type: SET_BASE, base }
}

export function sortItem(arr, key) {
  switch (key) {
    case 'price':
      return arr.sort((a, b) => b.price - a.price)
    case 'title':
      return arr.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
        return 0
      })
    default:
      return arr
  }
}

export function getRates() {
  return (dispatch) => {
    axios('/api/v1/rates').then(({ data }) => {
      dispatch({ type: GET_RATES, rates: data })
    })
  }
}

export function getProducts() {
  return (dispatch) => {
    axios(`/api/v1/products`).then(({ data }) => {
      dispatch({ type: GET_PRODUCTS, cards: data })
    })
  }
}

export function getLogs() {
  return (dispatch) => {
    axios(`/api/v1/logs`).then(({ data }) => {
      dispatch({ type: GET_LOGS, logs: data })
    })
  }
}

export function setStatus(status) {
  return { type: SET_STATUS, status }
}

// export function getProducts() {
//   return (dispatch) => {
//     fetch(`/api/v1/products`)
//       .then((res) => res.json())
//       .then((cards) => {
//         dispatch({ type: GET_PRODUCTS, cards })
//       })
//   }
// }
// export function getRates() {
//   return (dispatch) => {
//     fetch('/api/v1/rates')
//       .then((res) => res.json())
//       .then((rates) => {
//         dispatch({ type: GET_RATES, rates })
//       })
//   }
// }
