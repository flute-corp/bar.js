import * as types from './mutation-types'

const mutations = {
  [types.APP_CONNECT]: function (state, user) {
    this.state.user = user
  },
  [types.STATE_RESTORE]: function (state, backup) {
    Object.assign(this.state, backup)
  }
}

export default mutations
