const getters = {

  /**
   * Renvoi l'état de la  modal login
   */
  getEtatModal: function(state) {
    return {etatModalLogin: state.etatModalLogin};
  },
};

export default getters;