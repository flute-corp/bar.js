import * as types from './mutation-types'

let toastId = 0
const baseToast = {
  timeout: 6000
}
const mutations = {
  /**
   * Ajoute dans la pile des toast a afficher
   * @param state
   * @param toast
   */
  [types.UI_ADD_TOAST]: function (state, toast) {
    state.toast.push({
      ...baseToast,
      ...toast,
      value: true,
      key: ++toastId
    })
  }
}

export default mutations
