import * as types from './mutation-types';

const actions = {
  [types.USER_SET_USER]: function({commit}) {
    commit(types.USER_SET_USER);
  },
};

export default actions;