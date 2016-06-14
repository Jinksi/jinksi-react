import React from 'react'
import { Link } from 'react-router'

import FullScreen from 'react-icons/lib/io/arrow-expand'
import Min from 'react-icons/lib/io/arrow-shrink'

export default (props) => {

  const sketch = props.sketchComponent

  function handleFsClick(e){
    sketch.toggleFullScreen()
  }
  function renderLeft(){
    const prev = sketch.getPrev()
    if(sketch.getPrev()){
      return (
        <Link to={ `/sketch/${prev.id}` } title="Previous (Left Arrow)">
          <span>&larr;</span>
        </Link>
      )
    }
  }
  function renderRight(){
    const next = sketch.getNext()
    if(sketch.getNext()){
      return (
        <Link to={ `/sketch/${next.id}` } title="Next (Right Arrow)">
          <span>&rarr;</span>
        </Link>
      )
    }
  }

  return (
    <div id="sketch-title">
      { renderLeft() }
      <Link to={ `/sketch/${sketch.currentID}` }
        title="Toggle Fullscreen (Esc key)"
        onClick={handleFsClick}>
        <span>{ sketch.currentTitle }</span>
        { props.fs ? <Min /> : <FullScreen /> }
      </Link>
      { renderRight() }
    </div>
  )
}
