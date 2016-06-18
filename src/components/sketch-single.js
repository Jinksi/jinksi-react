import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import { sketchData } from './sketches'

class SketchSingle extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
  }

  render(){
    document.sketchComponent.updateSketch(this.props.params.sketchid)
    const sketch = sketchData.find(sketch => sketch.id === this.props.params.sketchid)
    const title = `${sketch.id} ${sketch.title} | Eric Jinks`
    return (
      <div className="sketch-single">
        <Helmet title={title} />
      </div>
    )
  }

}

export default SketchSingle
