import React from 'react'

import { Link } from 'react-router-dom'

import ROUTES from 'configuration/routes'

const MainPage = () => (
  <div>
    <h1>Main Page</h1>
    <Link to={ROUTES.layout}>Layout</Link>
  </div>
)

export default MainPage
