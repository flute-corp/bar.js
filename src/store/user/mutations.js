import * as types from './mutation-types'

const mutations = {
  /**
   * Déinit globalement l'utilisateur
   * @param state
   * @param user L'utilisateur connecté
   */
  [types.USER_SET_USER]: function (state, { id, name, token, mail, avatar }) {
    state.id = id
    state.name = name
    state.token = token
    state.mail = mail
    state.avatar = avatar
  }
}

export default mutations
