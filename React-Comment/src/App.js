import { useState } from 'react';
import './App.css';

function App() {
  const [ user, setUser ] = useState('')
  const [ content, setContent ] = useState('')
  const [ comment, setComment ] = useState([])

  const appendComment = () => {
    if(!user || !content) return
    setComment([...comment, { user, content }])
    setUser('')
    setContent('')
  }

  return (
    <div className="App">
      <div className="form">
        <input type="text" placeholder="请输入评论者" value={user} onChange={e => setUser(e.target.value)} />
        <textarea placeholder="请输入评论内容" value={content} onChange={e => setContent(e.target.value)} />
        <button onClick={appendComment}>发表评论</button>
      </div>
      <div className="comment">
        {
          comment.length === 0 ? (
            <div className="comment-empty">暂无评论</div>
          ) : (
            <ul className="comment-content">
              {
                comment.map(v => (
                  <li key={v}>
                    <h4>{v.user}</h4>
                    <p>{v.content}</p>
                  </li>
                ))
              }
            </ul>
          )
        }
      </div>
    </div>
  );
}

export default App;
