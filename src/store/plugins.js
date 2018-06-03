import * as types from './mutation-types'

const storeToSave = ['ui']
const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    const backup = {}
    for (let m in state) {
      if (storeToSave.includes(m)) {
        backup[m] = state[m]
      }
    }
    window.localStorage.setItem('state', JSON.stringify(backup))
  })

  const storage = JSON.parse(window.localStorage.getItem('state'))
  store.commit(types.STATE_RESTORE, storage)
}

export default [localStoragePlugin]
