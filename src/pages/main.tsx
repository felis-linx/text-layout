import React, { useCallback, useState, FunctionComponent } from 'react'

import { Link, RouteProps } from 'react-router-dom'

import cx from 'classnames'

import ROUTES from 'src/configuration/routes'

import './styles.css'

const MainPage: FunctionComponent<RouteProps> = ({ location: { state: { payload = '' } = {} } }) => {
  const [text, changeText] = useState(payload)

  const onChange = useCallback(event => changeText(event.target.value), [])

  return (
    <div className="uk-card uk-card-body uk-card-default uk-card-small">
      <div className="uk-card-header">
        <h1 className="uk-card-title">Enter text</h1>
      </div>

      <div className="uk-card-body">
        <textarea
          defaultValue={text}
          onChange={onChange}
          className="uk-textarea"
          rows={12}
          placeholder="Place your text here..."
        />

        <hr className="uk-divider-icon" />

        <Link
          styleName={cx({ 'disabled-link': !text })}
          className={cx('uk-button uk-button-link uk-align-right', { 'uk-link-muted': !text })}
          to={{
            pathname: ROUTES.layout,
            state: {
              payload: text,
            },
          }}
        >
          &raquo; Layout
        </Link>
      </div>
    </div>
  )
}

export default MainPage
