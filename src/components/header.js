import React from 'react';
import { Link } from 'react-router';

export default (props) => {
  return (
    <header className="header">
      <div className="container row">
        <div className="animated fadeIn four columns vertmid">
          <h1 className="logo"><Link to="/">
            <span>Eric</span><span>Jinks</span>
          </Link></h1>
          <div className="info">
            <div className="typed"></div>
          </div>
          <nav className="nav">
            <ul>
              <li><Link to="/">About</Link></li>
              <li><Link to="/sketches">Sketches</Link></li>
            </ul>
          </nav>
          <ul className="social">
            <li>
              <a href="http://twitter.com/jinksi" title="twitter.com/jinksi" className="tooltip"><i className="icon ion-social-twitter"></i></a><a href="http://github.com/jinksi"
              title="github.com/jinksi" className="tooltip"><i className="icon ion-social-github"></i></a>
              <a
              href="http://instagram.com/jinksi" title="instagram.com/jinksi" className="tooltip"><i className="icon ion-social-instagram"></i></a><a href="mailto:ericjinks@gmail.com"
                title="ericjinks@gmail.com" className="tooltip"><i className="icon ion-email"></i></a></li>
          </ul>
        </div>
      </div>
    </header>
  )
}
