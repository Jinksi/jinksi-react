import React, { Component } from 'react'

import sketch001 from '../sketches/001'
import sketch002 from '../sketches/002'

class Sketch extends Component {

  constructor(props){
    super(props)

    this.state = {
      currentSketch: parseInt(this.props.sketchid) || 1,
      sketches: [
        sketch001,
        sketch002
      ]
    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.currentSketch !== this.state.currentSketch
  }

  updateSketch(sketchid){
    console.log('updating to ', sketchid);
    this.setState({
      currentSketch: parseInt(sketchid)
    })
  }

  selectSketch (){
    if(this.p5){
      this.p5.remove()
    }
    const sketch = this.state.sketches[this.state.currentSketch - 1]
    this.p5 = new p5(sketch, 'sketchContainer')
  }

  render(){
    this.selectSketch()
    return (
      <div id='sketchContainer'>
      </div>
    )
  }
}

export default Sketch
