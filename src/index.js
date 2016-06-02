import React, {
  Component
} from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import App from './components/app'
import About from './components/about'
import Sketches from './components/sketches'
import SketchSingle from './components/sketch-single'
import NoMatch from './components/nomatch'

import sketch001 from './sketches/001'
import sketch002 from './sketches/002'

document.sketchComponent = {
  current: null,
  all: [
    sketch001,
    sketch002
  ],
  remove: function(){
    if(this.current){
      this.current.remove()
    }
  },
  updateSketch: function(sketchid){
    let newSketch
    if(!sketchid){
      newSketch = this.all[this.all.length - 1]
    } else {
      newSketch = this.all[parseInt(sketchid) - 1]
    }
    this.remove()
    this.current = new p5(newSketch)
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
