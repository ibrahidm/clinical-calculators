import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
   {
      path: '/',
      redirect: '/home'
   },
   {
      path: '/home',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
   },
   {
      path: '/crcl',
      name: 'Creatinine Clearance',
      component: () => import('../views/CrCl.vue')
   },
   {
      path: '/michaelis-menten',
      name: 'Michaelis-Menten Elimination',
      component: () => import('../views/MichaelisMenten.vue')
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

export default router
