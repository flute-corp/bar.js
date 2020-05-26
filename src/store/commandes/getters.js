const getters = {
  articlesCommande: (state, getters, rootState, rootGetters) => {
    const { current } = state
    const oCommande = {}
    let nbArt = 0
    for (let k in current.fav) {
      const artId = current.fav[k]
      oCommande[artId] = oCommande[artId]
        ? oCommande[artId]++
        : 1
      nbArt += oCommande[artId]
    }
    for (let k in current.cmd) {
      const qt = current.cmd[k]
      oCommande[k] = oCommande[k]
        ? oCommande[k] + qt
        : qt
      nbArt += oCommande[k]
    }
    const articles = Object.values(_.mapValues(oCommande, (qt, k) => ({
      ...rootGetters['articles/indexedArticles'][k] || { label: 'Article inconnu' },
      qt
    })))
    const cards = _.times(2, () => ({ nbArt: 0, articles: [] }))
    articles
      .sort((a, b) => a.prix > b.prix ? -1 : 1)
      .forEach(() => {

      })
    return {
      nbArt,
      articles,
      cards
    }
  }
}

export default getters
