const Item = require('../model/item')

const routerFunctions = {
  getItems: (req, res) => {
    Item.getAll((err, data) => {
      if(err)
        res.sendStatus(500).send({
          message: err.message || "Error"
        })
      else {
        data.forEach(item => {
          var fields = item.dueDate.split("-");
          var year = fields[0]
          var month = fields[1]
          var day = fields[2].split("T")[0]
          var time = fields[2].split("T")[1]
          var hour = time.split(":")[0]
          var minute = time.split(":")[1]
          var ampm
          if (hour > 12){
            hour -= 12
            ampm = "PM"
          }
          else
            ampm = "AM"

          item.dueDate = (`${month}/${day}/${year} ${hour}:${minute}${ampm}`)
        })
        res.render('index', {
          items: data
        })
      }

    })
  },

  addItem: (req, res) => {
    if (!req.body)
      res.sendStatus(500).send({
        message: "Content cannot be empty"
      })
    
    const item = {
      title: req.body.title,
      dueDate: req.body.dueDate
    }

    Item.add(item, (err, data) => {
      if (err)
        res.sendStatus(500).send({
          message: err.message || "Error"
        })
      else res.redirect('/')
    })
  },

  deleteItem: (req, res) => {
    if (!req.body)
      res.sendStatus(500).send({
        message: "Content cannot be empty"
      })
    
    Item.delete(req.params.id, (err, data) => {
      if (err)
        res.sendStatus(500).send({
          message: err.message || "Error"
        })
      else res.redirect('/')
    })
  },

  updateItem: (req, res) => {
    if(!req.body)
      res.sendStatus(500).send({
        message: "Content cannot be empty"
      })

      const item = {
        id: req.params.id,
        complete: parseInt(req.body.complete)
      }

      Item.changeStatus(item, (err,data) => {
        if (err)
          res.sendStatus(500).send({
            message: err.message || "Error"
          })
        else res.redirect('/')
      })
  },

  completeAllItems: (req, res) => {
    if(!req.body)
      res.sendStatus(500).send({
        message: "Content cannot be empty"
      })
    
    Item.completeAll((err, data) => {
      if (err)
      res.sendStatus(500).send({
        message: err.message || "Error"
      })
      else res.redirect('/')
    })
  }
}

module.exports = routerFunctions