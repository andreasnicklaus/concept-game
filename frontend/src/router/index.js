import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/instructions',
    name: 'Instructions',
    component: () => import('../views/InstructionView.vue')
  },
  {
    path: '/waitingRoom',
    name: 'WaitingRoom',
    component: () => import('../views/WaitingRoomView.vue')
  },
  {
    path: '/gameRoom',
    name: 'GameRoom',
    component: () => import('../views/GameRoomView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
