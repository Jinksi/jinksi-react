import React from 'react';
import { Link } from 'react-router'

import FullScreen from 'react-icons/lib/io/arrow-expand'
import Min from 'react-icons/lib/io/arrow-shrink'
import Left from 'react-icons/lib/fa/angle-left'
import Right from 'react-icons/lib/fa/angle-right'

export default (props) => {

  const sketch = props.sketchComponent

  function handleFsClick(e){
    sketch.toggleFullScreen()
  }
  function renderLeft(){
    const prev = sketch.getPrev()
    if(sketch.getPrev()){
      return (
        <Link to={ `/sketch/${prev.id}` }>
          <Left />
        </Link>
      )
    }
  }
  function renderRight(){
    const next = sketch.getNext()
    if(sketch.getNext()){
      return (
        <Link to={ `/sketch/${next.id}` }>
          <Right />
        </Link>
      )
    }
  }

  return (
    <div id="sketch-title">
      { renderLeft() }
      <Link to={ `/sketch/${sketch.currentID}` }
        onClick={handleFsClick}>
        <span>{ sketch.currentTitle }</span>
        { props.fs ? <Min /> : <FullScreen /> }
      </Link>
      { renderRight() }
    </div>
  )
}
