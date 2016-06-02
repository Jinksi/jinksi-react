import React, { Component } from 'react'

import One from '../sketches/001'
import Two from '../sketches/002'

class Sketch extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentSketch: 1
    }
  }

  shouldComponentUpdate(){
    return false;
  }

  selectSketch (){

    switch(this.state.currentSketch){
      case(1):
        return <One />
        break
      case (2):
        return <Two />
        break
    }
  }

  render(){
    return (
      <div id='sketchContainer'>
        { this.selectSketch() }
      </div>
    )
  }
}

export default Sketch
