const getters = {
  indexedArticles: ({ items }) => _.keyBy(items, 'id')
}

export default getters
