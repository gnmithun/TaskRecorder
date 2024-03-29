const Router = require('express').Router()
const CategoryController = require('../Controller/Category')
const Category = require('../Model/Category')
const Validators = require('../Controller/Validator')
const Access = require('../Controller/Access')

Router.use(Access.isAuthenticatedUser)
Router.post('/category',Validators.validateCategory,CategoryController.createCategory)
Router.get('/categories',CategoryController.getCategories)

module.exports = Router