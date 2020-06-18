import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './header'
import Cards from './cards'
import { getProducts, getRates } from '../redux/reducers/products'

const Main = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
    dispatch(getRates())
  }, [dispatch])

  return (
    <div>
      <Header />
      <Cards />
    </div>
  )
}
Main.propTypes = {}

export default Main
