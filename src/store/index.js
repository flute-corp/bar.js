import actions from './actions'
import mutations from './mutations'
import modules from './modules'
import plugins from './plugins'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  plugins,
  strict: process.env.NODE_ENV !== 'production'
})

if (module.hot) {
  // accepter les actions et mutations en tant que module à chaud
  module.hot.accept(['./actions', './mutations', './modules', './plugins'], () => {
    // requiert les modules à jour
    // ajout de `.default` ici pour les sorties des modules babel 6
    const newActions = require('./actions').default
    const newMutations = require('./mutations').default
    const newModules = require('./modules').default
    const newPlugins = require('./plugins').default
    // remplacer les nouvelles actions et mutations
    store.hotUpdate({
      actions: newActions,
      mutations: newMutations,
      modules: newModules,
      plugins: newPlugins
    })
  })
}

export default store
