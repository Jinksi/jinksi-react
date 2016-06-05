import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import App from './components/app'
import About from './components/about'
import Sketches from './components/sketches'
import SketchSingle from './components/sketch-single'
import NoMatch from './components/nomatch'

import { sketchData } from './components/sketches'

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
    if(!document.getElementById('sketch-title')){
      let el = document.createElement('div')
      el.setAttribute('id', 'sketch-title')
      document.body.appendChild(el)
    }

    let newSketch = !sketchid ?
    this.all[this.all.length - 1] :
    this.all[parseInt(sketchid) - 1]

    this.remove()
    document.sketchComponent.current = new p5(newSketch.file)
    document.getElementById('sketch-title').innerHTML = newSketch.id + ' ' + newSketch.title.toLowerCase()
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={About} />
      <Route path="sketches" component={Sketches}>
      </Route>
      <Route path="sketch/:sketchid" component={SketchSingle} />
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('container'))
