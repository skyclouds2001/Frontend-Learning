import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import MovieHome from '../views/MovieHome.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MovieHome',
    component: MovieHome
  },
  {
    path: '/list/:type',
    name: 'MovieList',
    component: () => import('../views/MovieList.vue')
  },
  {
    path: '/detail/:id',
    name: 'MovieDetail',
    component: () => import('../views/MovieDetail.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
