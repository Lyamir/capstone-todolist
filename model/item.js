const db = require ('./db')

const Item = function (title){
  this.title = title,
  this.completed = false
}

Item.add = (newItem, result) => {
  db.query("INSERT INTO items SET ?", [newItem.title], (err, res) => {
    if (err){
      console.log("error: ", err)
      result(err, null)
      return
    }

    result(null, {id: res.insertID, ...newItem})
  })
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

Item.delete = (id, result) => {
  db.query("DELETE FROM items WHERE id = ?", [id], (err, res) => {
    if (err){
      console.log("error:", err)
      result(null, err)
      return
    }

    result(null, res)
  })
}

Item.changeStatus = (item, result) => {
  db.query("UPDATE items SET complete = ? WHERE id = ?", [!item.complete, item.id], (err, res) => {
    if (err){
      console.log("error: ", err)
      result(err, null)
      return
    }
    result(null, `Updated post with ID: ${item.id}`)
  })
}

module.exports = Item