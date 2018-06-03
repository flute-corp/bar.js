import Vue from 'vue'
import Router from 'vue-router'
import Commande from './views/Commande.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Commande',
      component: Commande,
      icon: 'local_bar'
    }
  ]
})
