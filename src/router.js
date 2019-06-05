import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from '@/layouts/Default'
import routes from '@/routes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: routes
    }
  ]
})
