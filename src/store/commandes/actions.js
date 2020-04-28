import * as types from './mutation-types'

const actions = {
  /**
   * Modification de la quantité d'un article dans la commande
   * @param state
   * @param commit
   * @param rootState
   * @param idArticle
   * @param qt
   */
  [types.COMMANDE_CURRENT_SET_ARTICLE] ({ state, commit, rootState }, { idArticle, qt }) {
    if (!idArticle) throw Error('idArticle est obligatoire')
    if (!Number.isInteger(qt)) throw Error('Une quantité est un nombre', qt)
    if (qt < 0) {
      commit('ui/addToast', { text: 'La maison ne fait pas crédit' }, { root: true })
      qt = 0
    }
    commit(types.COMMANDE_CURRENT_SET_ARTICLE, { idArticle, qt })
  }
}

export default actions
