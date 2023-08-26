import React, { useState } from 'react'

const { Provider, Consumer } = React.createContext()

function Show (props) {
  return (
    <Consumer>
      {
        data => (<span>{data}</span>)
      }
      <div>{props.children}</div>
    </Consumer>
  )
}

Show.propTypes = {
  id: propTypes.number
}

export default function Hello () {
  const [count, update] = useState(0)
  const [text, updateText] = useState('')
  const [sel, updateSel] = useState(0)
  const [ch, updateCh] = useState(false)

  const updateCount = () => update(count - 1)

  return (
    <Provider value={6}>
      <div>
        <span>{ count }</span>
        <button onClick={ updateCount }>decrease</button>
        <input value={ text } onChange={e => updateText(e.target.value)} />
        <span>{ sel }</span>
        <select value={sel} onChange={e => {updateSel(e.target.value)}}>
          <option value={1}>c</option>
          <option value={2}>d</option>
        </select>
        <input type="checkbox" checked={ch} onChange={e => updateCh(e.target.checked)} />
      </div>
      <div>
        <Show id={1}>666</Show>
      </div>
    </Provider>
  )
}
