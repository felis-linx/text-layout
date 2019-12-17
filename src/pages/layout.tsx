import React, { useMemo, useState, FunctionComponent } from 'react'

import { Link, RouteProps } from 'react-router-dom'
import Column from 'src/components/column'

import cx from 'classnames'

import ROUTES from 'src/configuration/routes'
import splitText from 'src/utils/split-text'

import './styles.css'

const BUTTONS = [
  { title: 'One column layout', icons: [{ key: 'left', style: '' }] },
  {
    title: 'Two columns layout',
    icons: [
      { key: 'left', style: 'icon-shift right' },
      { key: 'right', style: '' },
    ],
  },
  {
    title: 'Three columns layout',
    icons: [
      { key: 'left', style: 'icon-shift right' },
      { key: 'middle', style: '' },
      { key: 'right', style: 'icon-shift left' },
    ],
  },
]

const LayoutPage: FunctionComponent<RouteProps> = ({ location: { state: { payload = '' } = {} } }) => {
  const [columns, setColumnsAmount] = useState(1)
  const [text, updateText] = useState(payload)
  const chunks = useMemo(() => splitText({ text, columns }), [text, columns])

  const onChangeColumnsAmount = event => {
    setColumnsAmount(Number(event.currentTarget.getAttribute('data-columns')))
  }

  const handleChangeChunk = ({ index, value }) => {
    const updated = chunks.map((chunk, i) => (i === index ? value : chunk)).join(' ')

    updateText(updated)
  }

  return (
    <div className="uk-card uk-card-body uk-card-default uk-card-small">
      <div className="uk-card-header">
        <div className="uk-grid-small uk-flex-middle uk-grid">
          <div className="uk-width-auto">
            <h1 className="uk-card-title uk-margin-remove-bottom">Select layout</h1>
          </div>
          <div className="uk-width-expand">
            <div className="uk-button-group">
              {BUTTONS.map(({ title, icons }, index) => {
                const active = index + 1 === columns

                return (
                  <button
                    key={title}
                    title={title}
                    type="button"
                    data-columns={index + 1}
                    className={cx('uk-button uk-button-default', { 'uk-button-primary': !active })}
                    disabled={active}
                    onClick={onChangeColumnsAmount}
                  >
                    {icons.map(({ key, style }) => (
                      <span key={`icon-${title}-${key}`} styleName={style} data-uk-icon="icon: file-text" />
                    ))}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="uk-card-body">
        <div className="uk-grid-divider uk-child-width-expand@s" data-uk-grid>
          {chunks.map((chunk, index) => (
            <div key={`text-chunk-${index + 1}`}>
              <div className="uk-card uk-card-default uk-card-body">
                <Column index={index} content={chunk} onChange={handleChangeChunk} />
              </div>
            </div>
          ))}
        </div>

        <hr className="uk-divider-icon" />

        <Link
          className="uk-button uk-button-link"
          to={{
            pathname: ROUTES.main,
            state: {
              payload: text,
            },
          }}
        >
          &laquo; Go back
        </Link>
      </div>
    </div>
  )
}

export default LayoutPage
