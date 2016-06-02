import React, { Component } from 'react'
import { Link } from 'react-router'

class SketchSingle extends Component {

  constructor(props){
    super(props)
  }

  componentWillMount(){
    document.sketchComponent.remove()
  }

  componentDidMount(){
    document.sketchComponent.updateSketch(this.props.params.sketchid)
  }

  render(){

    return (
      <div className="sketch-single">

      </div>
    )
  }

}

export default SketchSingle