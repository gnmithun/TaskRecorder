const Router = require('express').Router()
const CategoryController = require('../Controller/Category')
const Category = require('../Model/Category')

Router.post('/category',CategoryController.createCategory)
Router.get('/categories',CategoryController.getCategories)

module.exports = Router