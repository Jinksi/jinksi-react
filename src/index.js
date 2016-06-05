import React, { Component } from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'

import { sketchData } from './components/sketches'
import Routes from './routes'

function refresh(){
  browserHistory.setState({})
}

document.sketchComponent = {
  current: null,
  all: sketchData,
  currentTitle: null,
  currentID: null,
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

    if(newSketch.id === this.currentID){ return false }

    this.remove()
    document.sketchComponent.current = new p5(newSketch.file)
    this.currentTitle = newSketch.id + ' ' + newSketch.title.toLowerCase()
    this.currentID = newSketch.id
    refresh()
  },
  toggleFullScreen: function(){
    document.body.classList.toggle('sketch-fs')
    refresh()
  }
}

render((
  <Routes/>
), document.getElementById('container'))
