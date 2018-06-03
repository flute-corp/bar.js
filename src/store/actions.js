import * as types from './mutation-types'

const actions = {
  [types.APP_CONNECT]: function ({commit}) {
    commit(types.APP_CONNECT, {id: 25, name: 'Daedalus'})
  }
}

export default actions
