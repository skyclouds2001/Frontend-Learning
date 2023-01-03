import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const Home = lazy(() => import('@/views/Home'))
const About = lazy(() => import('@/views/About'))
const User = lazy(() => import('@/views/User'))
const Login = lazy(() => import('@/views/Login'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/about" />,
  },
  {
    path: '/',
    element: (
      <React.Suspense fallback={ <div>loading...</div> }>
        <Home />
      </React.Suspense>
    ),
    children: [
      {
        path: '/about',
        element: (
          <React.Suspense fallback={ <div>loading...</div> }>
            <About />
          </React.Suspense>
        ),
      },
      {
        path: '/user',
        element: (
          <React.Suspense fallback={ <div>loading...</div> }>
            <User />
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <React.Suspense fallback={ <div>loading...</div> }>
        <Login />
      </React.Suspense>
    )
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]

export default routes;
