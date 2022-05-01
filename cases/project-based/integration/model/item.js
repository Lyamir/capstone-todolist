const db = require ('./db')

const Item = function (title, dueDate){
  this.title = title,
  this.dueDate = dueDate
  this.complete = false
}

Item.getAll = result => {
  db.query("SELECT * FROM items", (err, res) => {
    if (err){
      console.log("error:", err)
      result(null, err)
      return
    }

    result(null, res)
  })
}

module.exports = Item