import actions from './actions'
import mutations from './mutations'
import modules from './modules'
import plugins from './plugins'
import getters from './getters'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
  plugins,
  strict: process.env.NODE_ENV !== 'production'
})

if (module.hot) {
  // accepter les actions et mutations en tant que module à chaud
  module.hot.accept(['./getters', './actions', './mutations', './modules', './plugins'], () => {
    // requiert les modules à jour
    // ajout de `.default` ici pour les sorties des modules babel 6
    const newGetters = require('./getters').default
    const newActions = require('./actions').default
    const newMutations = require('./mutations').default
    const newModules = require('./modules').default
    const newPlugins = require('./plugins').default
    // remplacer les nouvelles actions et mutations
    store.hotUpdate({
      getters: newGetters,
      actions: newActions,
      mutations: newMutations,
      modules: newModules,
      plugins: newPlugins
    })
  })
}

export default store
