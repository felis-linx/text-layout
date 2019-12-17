import React, { useCallback, useRef, FunctionComponent } from 'react'

import ContentEditable from 'react-contenteditable'

import './styles.css'

type ColumnProps = {
  index: number;
  content: string;
  onChange: ({ index: number, value: string }) => void;
}

const Column: FunctionComponent<ColumnProps> = ({ index, content, onChange }) => {
  const editableRef = useRef(null)

  const handleBlur = useCallback(() => {
    onChange({ index, value: editableRef.current.innerHTML })
  }, [index, onChange])

  const handleChange = useCallback(() => {}, [])

  return (
    <ContentEditable
      innerRef={editableRef}
      styleName="editable-text"
      html={content}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  )
}

export default Column
