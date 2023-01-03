import React, { useEffect, useState } from 'react'
import { Input, Form, Space, Button } from 'antd'
import styles from './login.module.scss'

const Login: React.FC = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [captcha, setCaptcha] = useState('')

  useEffect(() => {}, [])

  return (
    <div className={styles.page}>
      <Form className={styles.box}>
        <div className={styles.title}>
          <h1>通用后台管理系统</h1>
          <p>Every Day</p>
        </div>
        <div className={styles.form}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Input autoComplete="username" placeholder="账号" onChange={e => setUserName(e.target.value)} />
            <Input.Password autoComplete="current-password" placeholder="密码" onChange={e => setPassword(e.target.value)} />
            <div className={styles.captcha}>
              <Input placeholder="验证码" onChange={e => setCaptcha(e.target.value)} />
              <div>
                <img src="" alt="" width="50" height="30" />
              </div>
            </div>
            <Button type="primary" block>登录</Button>
          </Space>
        </div>
      </Form>
    </div>
  )
}

export default Login
