const Router = require('express').Router()
const CategoryController = require('../Controller/Category')
const Category = require('../Model/Category')
const Validators = require('../Controller/Validator')
const Access = require('../Controller/Access')

Router.post('/category',Access.isAuthenticatedUser,Validators.validateCategory,CategoryController.createCategory)
Router.get('/categories',Access.isAuthenticatedUser,CategoryController.getCategories)

module.exports = Router