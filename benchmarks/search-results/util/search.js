const searchResultsData = require('./search-results-data.json')

exports.performSearch = function(input) {
  const pageIndex = input.pageIndex || 0
  const pageSize = 100
  const start = pageIndex * pageSize

  const items = []

  for (let i = start; i < start + pageSize; i++) {
    items.push(searchResultsData.items[i % searchResultsData.items.length])
  }

  const results = {
    pageIndex: pageIndex,
    totalMatches: searchResultsData.items.length,
    items: items
  }

  return results
}
