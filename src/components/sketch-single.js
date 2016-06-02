import React, { Component } from 'react'
import { Link } from 'react-router'

import Sketch from './sketch'

class SketchSingle extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    // this.refs.sketchComponent.updateSketch(this.props.params.id)
  }

  render(){

    return (
      <div className="sketch-single">

      </div>
    )
  }

}

export default SketchSingle
