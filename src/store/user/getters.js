const getters = {

  /**
   * Renvoie ce qu'il faut afficher dans la fenetre de discussion actuellement sélectionnée
   */
  getUser: function (state) {
    return {
      id: state.id,
      name: state.name,
      token: state.token,
      mail: state.mail,
      avatar: state.avatar
    }
  }

}

export default getters
