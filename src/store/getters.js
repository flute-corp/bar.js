
const getters = {
  /**
   * Récupère la carte
   * @param state
   */
  getCarte: (state) => {
    return state.categories.items.map((c) => {
      return {
        ...c,
        articles: state.articles.items.filter((a) => a.cat === c.id)
      }
    })
  }
}

export default getters
