import React from 'react'
import ReactDOM from 'react-dom'

import { Router } from 'react-router'

import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

import history from './utils/history'

// loads the Icon plugin
import Application from './application'

const elem = document.getElementById('application-container')

if (elem === null) {
  throw new Error('Can`t get elewment #appplication-container')
}

UIkit.use(Icons)

ReactDOM.render(
  <Router history={history}>
    <Application />
  </Router>,
  elem,
)
