const Router = require('express').Router()
const CategoryController = require('../Controller/Category')

Router.post('/category',CategoryController.createCategory)

module.exports = Router