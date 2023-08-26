import './App.css';
import { Route, Link, Routes } from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <h1>router</h1>
        <Link to="/">link main</Link>
        <Link to="/route">link router</Link>
        <Routes>
          <Route path="/" element={<div>in main</div>}></Route>
          <Route path="/route" element={<div>in route</div>}></Route>
        </Routes>
      </div>
  );
}

export default App;
