import React from 'react'
import Hello from './Hello'
import HelloHello from './HelloHello'
import Form from './form'

function Cpp() {
  return (
    <div>cccccc</div>
  )
}

class Dpp extends React.Component {
  render() {
    return (<div>dddddd</div>)
  }
}

function App() {
  return (
    <div>
        <Cpp />
        <Dpp />
        <Hello />
        <HelloHello />
        <Form />
    </div>
  );
}

export default App;
