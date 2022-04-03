const express = require('express')
const app = express()
const router = express.Router()
const controller = require('../controller/indexController')

router.get('/', controller.getItems)
router.post('/', controller.addItem)
router.get('/delete/:id', controller.deleteItem)
router.post("/update/:id", controller.updateItem)
router.get("/update", controller.completeAllItems)

module.exports = router