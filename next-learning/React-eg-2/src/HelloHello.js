import React from 'react'

export default class Hello extends React.Component {
  // constructor () {
  //   super()
  //   this.state = {
  //     count: 0
  //   }
  // }

  state = {
    count: 0,
    txt: ''
  }

  render() {
    return (
    <div>
      <span>{ this.state.count }</span>
      <input type="text" value={ this.state.txt } onChange={ e => this.setState({ txt: e.target.value }) } />
      <button onClick={ () => { this.setState({ count: this.state.count + 1 }) } }>increase</button>
    </div>
    )
  }
}
