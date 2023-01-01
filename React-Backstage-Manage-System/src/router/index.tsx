import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const Home = lazy(() => import('@/views/home'))
const About = lazy(() => import('@/views/about'))
const User = lazy(() => import('@/views/User'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/home',
    element: (
      <React.Suspense fallback={<div>loading...</div>}>
        <Home />
      </React.Suspense>
    ),
  },
  {
    path: '/about',
    element: (
      <React.Suspense fallback={<div>loading...</div>}>
        <About />
      </React.Suspense>
    ),
  },
  {
    path: '/user',
    element: (
      <React.Suspense fallback={<div>loading...</div>}>
        <User />
      </React.Suspense>
    ),
  },
]

export default routes;
