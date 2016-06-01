import React from 'react'

import Header from './header';
import Footer from './footer';

export default (props) => {
  return (
    <div>
      <Header />
        <div className="container row fullheight no-pointer vertmid">
          <div className="animated fadeIn eight columns content offset-by-four">
            <div>
              {props.children}
            </div>
          </div>
        </div>
      <Footer />
    </div>
  )
}
