import React, { Suspense, lazy } from 'react'

import { Route, Switch } from 'react-router-dom'

import MainPage from 'pages/main'
import Spinner from 'components/spinner'

import ROUTES from 'configuration/routes'

import './styles.css'

const LayoutPage = lazy(() => import('pages/layout'))

const Application = () => (
  <div styleName="application">
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path={ROUTES.main} component={MainPage} />
        <Route path={ROUTES.layout} component={LayoutPage} />
      </Switch>
    </Suspense>
  </div>
)

export default Application
