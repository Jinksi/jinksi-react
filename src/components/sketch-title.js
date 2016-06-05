import React from 'react';
import { Link } from 'react-router'

import FullScreen from 'react-icons/lib/io/arrow-expand'
import Min from 'react-icons/lib/io/arrow-shrink'

export default (props) => {

  function handleFsClick(e){
    document.sketchComponent.toggleFullScreen()
  }

  return (
    <div id="sketch-title">
      <Link to={ props.link }
        onClick={handleFsClick}>
        <span>{ props.title }</span>
        { props.fs ? <Min /> : <FullScreen /> }
      </Link>
    </div>
  )
}
