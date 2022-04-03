const Item = require('../model/item')

const routerFunctions = {
  getItems: (req, res) => {
    Item.getAll((err, data) => {
      if(err)
        res.sendStatus(500).send({
          message: err.message || "Error"
        })
      else
        res.render('index', {
          items: data
        })
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