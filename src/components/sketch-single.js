import React, { Component } from 'react'
import { Link } from 'react-router'

class SketchSingle extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
  }

  render(){
    document.sketchComponent.updateSketch(this.props.params.sketchid)
    return (
      <div className="sketch-single">

      </div>
    )
  }

}

export default SketchSingle
