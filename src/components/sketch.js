import React, { Component } from 'react'

import One from '../sketches/001'

class Sketch extends Component {

  constructor(props){
    super(props)
  }

  shouldComponentUpdate(){
    return false;
  }

  render(){
    return (
      <div id='sketchContainer'>
        <One />
      </div>
    )
  }
}

export default Sketch
