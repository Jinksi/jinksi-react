import React, { Component } from 'react'
import Helmet from 'react-helmet'

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
        <Helmet
          title="Eric Jinks"
          meta={[
            {'property': 'og:title', 'content': 'Eric Jinks'}
          ]}
        />
        <SketchTitle
          sketchComponent={ document.sketchComponent }
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
