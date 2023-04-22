// For utility functions used often

export default class utils {

  getQueryString(options) {

  }

  getItemIndex(data, id) {
    const index = data.findIndex( item => parseInt(item.id) === parseInt(id))
    return index
  }
}