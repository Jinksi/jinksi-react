import React, { Component } from 'react'

import Header from './header'
import Footer from './footer'
import SketchTitle from './sketch-title'

class App extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    if(!document.sketchComponent.current){
      document.sketchComponent.updateSketch()
    }
  }

  render(){
    return (
      <div>
        <SketchTitle
          title={ document.sketchComponent.currentTitle }
          link={ `/sketch/${document.sketchComponent.currentID}` }
          fs={ document.body.classList.contains('sketch-fs') }
          />
        <Header />
        <div className="container row fullheight no-pointer vertmid">
          <div className="eight columns content offset-by-four">
            <div>
              {this.props.children}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
