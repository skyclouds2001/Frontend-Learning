import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: '1',
    label: 'Option 1',
    icon: <PieChartOutlined />,
  },
  {
    key: '2',
    label: 'Option 2',
    icon: <DesktopOutlined />,
  },
  {
    key: 'sub1',
    label: 'Option 3',
    icon: <UserOutlined />,
    children: [
      {
        key: '3',
        label: 'Option 3-1',
      },
      {
        key: '4',
        label: 'Option 3-2',
      },
      {
        key: '5',
        label: 'Option 3-3',
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Option 4',
    icon: <TeamOutlined />,
    children: [
      {
        key: '6',
        label: 'Option 4-1',
      },
      {
        key: '7',
        label: 'Option 4-2',
      },
    ],
  },
  {
    key: '9',
    label: 'Option 5',
    icon: <FileOutlined />,
  },
]

const SidebarMenu: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const[openKeys, setOpenKeys] = useState<string[]>([])

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={ [location.pathname] }
      mode="inline"
      openKeys={ openKeys }
      items={ items }
      onClick={ e => navigate(e.key) }
      onOpenChange={ e => setOpenKeys(e.filter(v => !openKeys.includes(v))) }
    />
  )
}

export default SidebarMenu
