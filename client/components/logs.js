/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getLogs } from '../redux/reducers/products'

// import Header from './header'
// import axios from 'axios'

const LOGS = () => {
  const dispatch = useDispatch()
  const logs = useSelector((store) => store.products.logs)
  useEffect(() => {
    dispatch(getLogs())
  }, [dispatch])
  return (
    <div>
      <button
        className="bg-gray-300 hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded-full"
        type="button"
      >
        <Link to="/">Main</Link>
      </button>

      {logs.map((it) => {
        return <div key={it}>{it.type}</div>
      })}
    </div>
  )
}

LOGS.propTypes = {}

export default React.memo(LOGS)
