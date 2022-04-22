const db = require ('./db')

const Item = function (title, dueDate){
  this.title = title,
  this.dueDate = dueDate
  this.complete = false
}

Item.add = (newItem, result) => {
  db.query("INSERT INTO items VALUES (?, ?, ?, ?)", [0, newItem.title, newItem.dueDate, false], (err, res) => {
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

Item.completeAll = (result) => {
  db.query(("UPDATE itemz SET complete = 1"), (err, res) => {
    if (err){
      console.log("error: ", err)
      result(err, null)
      return
    }
    result(null, "All items completed")
  })
}

module.exports = Item