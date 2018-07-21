import * as types from './mutation-types';

const actions = {
  [types.USER_SET_USER]: function({commit}, {user}) {
    commit(types.USER_SET_USER, user);
  },
};

export default actions;