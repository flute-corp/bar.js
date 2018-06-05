import Vue from 'vue'
import Router from 'vue-router'
import Commande from './views/Commande.vue'
import Stats from './views/Stats.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Commande',
      component: Commande,
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
