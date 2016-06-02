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

import { sketchData } from './components/sketches'

document.sketchComponent = {
  current: null,
  all: sketchData.map(sketch => {
    sketch.file = '/sketches/' + sketch.file
    return sketch
  }),
  remove: function(){
    if(this.current){
      this.current.remove()
    }
  },
  updateSketch: function(sketchid){

    if(!this.all){ return false }

    let newSketch
    if(!sketchid){
      newSketch = this.all[this.all.length - 1]
    } else {
      newSketch = this.all[parseInt(sketchid) - 1]
    }
    this.remove()
    const funcName = 'sketch' + newSketch.id
    if(!window[funcName]){
      this.getSketch(newSketch.file, function(response){
        document.sketchComponent.current = new p5(window[funcName])
      })
    } else {
      document.sketchComponent.current = new p5(window[funcName])
    }
  },
  getSketch: function(url, callback){

    let script = document.createElement('script');
    script.src = url;
    script.onload = function () {
      return callback(script)
    };
    document.body.appendChild(script);
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
