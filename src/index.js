import React, {
  Component
} from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import App from './components/app'
import About from './components/about'
import NoMatch from './components/nomatch'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={About} />
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('container'))
