import React from 'react'
import ReactDOM from 'react-dom'

import { Router } from 'react-router'

import history from 'utils/history'

import Application from './application'

const elem = document.getElementById('application-container')

if (elem === null) {
  throw new Error('Can`t get elewment #appplication-container')
}

ReactDOM.render(
  <Router history={history}>
    <Application />
  </Router>,
  elem,
)
