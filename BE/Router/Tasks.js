const express = require('express')
const Router = express.Router()
const TaskController = require('../Controller/Tasks')

Router.post('/tasks',TaskController.createTask)
Router.get('/tasks',TaskController.getTasks)

module.exports = Router


