import React, { Component } from 'react'

import Header from './header'
import Footer from './footer'
import Sketch from './sketch'

class App extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        <Header />
        <div className="container row fullheight no-pointer vertmid">
          <div className="eight columns content offset-by-four">
            <div>
              {this.props.children}
            </div>
          </div>
        </div>
        <Footer />
        <Sketch ref={"sketchComponent"} />
      </div>
    )
  }
}

export default App
