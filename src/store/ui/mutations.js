import * as types from './mutation-types';

let toastId = 0;
const baseToast = {
  timeout: 6000
};

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
    });
  },

  /**
   * Change l'etat de la modal login open/close
   * @param state
   * @param etat : open = true, close = false
   */
  [types.UI_SET_ETAT_MODAL_LOGIN]: function (state, etat) {
    state.etatModalLogin = etat;
  }

};

export default mutations;
