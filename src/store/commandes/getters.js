const getters = {
  articlesCommande: (state) => {
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
    return {
      nbArt,
      oCommande
    }
  }
}

export default getters
