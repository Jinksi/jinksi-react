import { sketchData } from './sketches'
import { browserHistory } from 'react-router'

function refresh(){
  browserHistory.setState({})
}

export default {
  current: null,
  all: sketchData,
  currentTitle: null,
  currentID: null,
  currentIndex: null,
  currentAudio: null,
  remove: function(){
    if(this.current){
      this.current.remove()
      this.current = null
    }
  },
  updateSketch: function(sketchid){
    if(!this.all){ return false }

    let newSketchIndex = !sketchid ?
    this.all.length - 1 :
    this.all.findIndex(sketch => sketch.id === sketchid)

    let newSketch = this.all[newSketchIndex]

    if(newSketch.id === this.currentID){ return false }

    this.remove()
    document.sketchComponent.current = new p5(newSketch.file)
    this.currentTitle = newSketch.id + ' ' + newSketch.title.toLowerCase()
    this.currentID = newSketch.id
    this.currentAudio = newSketch.audio
    this.currentIndex = newSketchIndex
    refresh()
  },
  toggleFullScreen: function(){
    document.body.classList.toggle('sketch-fs')
    refresh()
  },
  getPrev: function(){
    if(this.all[this.currentIndex - 1]){
      return this.all[this.currentIndex - 1]
    } else {
      return false
    }
  },
  getNext: function(){
    if(this.all[this.currentIndex + 1]){
      return this.all[this.currentIndex + 1]
    } else {
      return false
    }
  }
}

document.body.addEventListener('keydown', (e) => {
  const sketch = document.sketchComponent
  const path = '/sketch/'
  if(e.keyIdentifier === 'Left' && sketch.getPrev()){
    browserHistory.push({pathname: path + sketch.getPrev().id})
  }
  if(e.keyIdentifier === 'Right' && sketch.getNext()){
    browserHistory.push({pathname: path + sketch.getNext().id})
  }
  if(e.keyCode === 27){ // esc key
    browserHistory.replace({pathname: path + sketch.currentID})
    sketch.toggleFullScreen()
  }
})
