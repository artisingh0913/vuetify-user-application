import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import About from '@/components/About'
import Login from '@/components/Login'
import Welcome from '@/components/Welcome'
import Register from '@/components/Register'
// import Main from '@/components/MainPage'
import AddUser from '@/components/AddUser'
import Footer from '@/components/Footer'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },    
    {
      path: '/about',
      name: 'About',
      component: About
    },    
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/footer',
      name: 'Footer',
      component: Footer
    },
    {
      path: '/adduser',
      name: 'AddUser',
      component: AddUser
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }    
  ]
})