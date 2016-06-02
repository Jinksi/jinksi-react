import React from 'react'
import { Link } from 'react-router'

export default (props) => {
  return (
    <div className="animated fadeIn">
      <Link to="/sketch/001">001</Link>
      <br/>
      <Link to="/sketch/002">002</Link>
    </div>
  )
}
