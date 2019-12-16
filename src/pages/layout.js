import React from 'react'

import { Link } from 'react-router-dom'

import ROUTES from 'configuration/routes'

const LayoutPage = () => (
  <div>
    <h1>Layout Page</h1>
    <Link to={ROUTES.main}>Go back</Link>
  </div>
)

export default LayoutPage
