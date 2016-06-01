import React, {
  Component
} from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import App from './components/app'
import NoMatch from './components/nomatch'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
    <Route path="*" component={NoMatch}/>
  </Router>
), document.getElementById('container'))
