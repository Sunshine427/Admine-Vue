import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import UserList from '@/components/user-list/user-list.vue'
import RolesList from '@/components/roles-list/roles-list.vue'

import {getUserInfo} from '@/assets/js/auth.js'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'user-list',
          path: '/users',
          component: UserList
        },
        {
          name: 'roles-list',
          path: '/roles',
          component: RolesList
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.name === 'login') {
    // 如果是login就放行
    return next()
  }
  // 如果不是login，就判断有没有token
  const token = getUserInfo()
  if (!token) {
    return next({
      name: 'login'
    })
  }
  next()
})
export default router
