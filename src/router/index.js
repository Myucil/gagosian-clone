import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Artists from '../views/Artists.vue'
import ArtistDetail from '../views/ArtistDetail.vue'
import Exhibitions from '../views/Exhibitions.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/artists',
    name: 'Artists',
    component: Artists
  },
  {
    path: '/artists/:slug',
    name: 'ArtistDetail',
    component: ArtistDetail
  },
  {
    path: '/exhibitions',
    name: 'Exhibitions',
    component: Exhibitions
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
