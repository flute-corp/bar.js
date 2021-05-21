import * as types from './mutation-types'

const actions = {
  [types.UI_ADD_TOAST]: function ({ commit }, toast) {
    commit(types.UI_ADD_TOAST, toast)
  },
  [types.UI_SET_ETAT_MODAL_LOGIN]: function ({ commit }, etat) {
    commit(types.UI_SET_ETAT_MODAL_LOGIN, etat)
  }
}

export default actions
