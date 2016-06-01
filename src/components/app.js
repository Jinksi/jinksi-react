import React, { Component } from 'react'

import Header from './header'
import Footer from './footer'
import Sketch from './sketch'

class App extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){

  }

  render(){
    return (
      <div>
        <Sketch />

        <Header />
        <div className="container row fullheight no-pointer vertmid">
          <div className="animated fadeIn eight columns content offset-by-four">
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
