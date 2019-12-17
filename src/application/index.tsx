import React, { Suspense, lazy } from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import MainPage from 'src/pages/main'
import Spinner from 'src/components/spinner'

import ROUTES from 'src/configuration/routes'

import './styles.css'

const LayoutPage = lazy(() => import('src/pages/layout'))

const Application = () => (
  <div styleName="application" className="uk-container uk-section">
    <h1 className="uk-heading-bullet">React coding task «Text Layout»</h1>
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <Switch>
          <Route exact path={ROUTES.main} component={MainPage} />
          <Route path={ROUTES.layout} component={LayoutPage} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  </div>
)

export default Application
