import * as types from './mutation-types'

const mutations = {
  /**
   * Ouvre le menu
   * @param state
   */
  [types.UI_MENU_OPEN]: function (state) {
    state.isOpen = true
  },

  /**
   * Ferme le menu
   * @param state
   */
  [types.UI_MENU_CLOSE]: function (state) {
    state.isOpen = false
  },

  /**
   * Toggle le menu
   * @param state
   */
  [types.UI_MENU_TOGGLE]: function (state) {
    state.isOpen = !state.isOpen
  },

  /**
   * Toggle la taille du menu
   * @param state
   */
  [types.UI_MENU_TOGGLE_SIZE]: function (state) {
    state.miniVariant = !state.miniVariant
  }
}

export default mutations
