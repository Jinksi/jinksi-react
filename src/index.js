import React, { Component } from 'react'
import { render } from 'react-dom'

import { sketchData } from './components/sketches'
import Routes from './routes'

const renderApp = () => {
  render((
    <Routes />
  ), document.getElementById('container'))
}

document.sketchComponent = {
  current: null,
  all: sketchData,
  currentTitle: null,
  remove: function(){
    if(this.current){
      this.current.remove()
      this.current = null
    }
  },
  updateSketch: function(sketchid){
    if(!this.all){ return false }

    let newSketch = !sketchid ?
    this.all[this.all.length - 1] :
    this.all.filter(sketch => sketch.id === sketchid)[0]
    this.remove()
    document.sketchComponent.current = new p5(newSketch.file)
    this.currentTitle = newSketch.id + ' ' + newSketch.title.toLowerCase()
    renderApp()
  }
}

renderApp()
