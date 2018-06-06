import * as types from './mutation-types'

const mutations = {
  /**
   * Déinit globalement l'utilisateur
   * @param state
   * @param user L'utilisateur connecté
   */
  [types.USER_SET_USER]: function (state, user) {
    state.user = user
  }
}

export default mutations
