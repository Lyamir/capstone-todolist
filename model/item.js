const db = require ('./db')

const Item = function (title){
  this.title = title,
  this.completed = false
}

module.exports = Item