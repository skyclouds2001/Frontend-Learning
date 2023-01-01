import { Button } from 'antd'
import { RetweetOutlined } from '@ant-design/icons'
import C1 from '@/components/C1'
import C2 from '@/components/C2'

function App() {
  return (
    <div className="App">
      <C1 />
      <C2 />
      <Button type="primary">button</Button>
      <RetweetOutlined />
    </div>
  )
}

export default App
