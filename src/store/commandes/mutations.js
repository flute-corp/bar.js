import Vue from 'vue'
import * as types from './mutation-types'

const mutations = {
  /**
   * Modification de la quantité d'un article dans la commande
   * @param state
   * @param idArticle
   * @param qt
   */
  [types.COMMANDE_CURRENT_SET_ARTICLE] (state, { idArticle, qt }) {
    Vue.set(state.current.cmd, idArticle, qt)
  }
}

export default mutations
