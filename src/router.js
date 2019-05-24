import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/student',
      name: 'student',
      component: () => import('./views/Student.vue')
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import('./views/Teacher.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    }
  ]
})
