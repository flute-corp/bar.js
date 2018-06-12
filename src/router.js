import Vue from 'vue'
import Router from 'vue-router'
import Carte from './views/Carte.vue'
import Stats from './views/Stats.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Carte',
      component: Carte,
      icon: 'local_bar'
    },
    {
      path: '/stats',
      name: 'Stats',
      component: Stats,
      icon: 'poll'
    }
  ]
})
