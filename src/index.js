import React, {
  Component
} from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import App from './components/app'
import Home from './components/home'
import NoMatch from './components/nomatch'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('container'))
