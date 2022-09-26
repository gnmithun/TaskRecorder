const express = require('express')
const Router = express.Router()
const TaskController = require('../Controller/Tasks')

Router.post('/tasks',TaskController.createTask)
Router.get('/tasks',TaskController.getTasks)
Router.get('/task/:taskId',TaskController.getTask)
Router.delete('/task/:taskId',TaskController.deleteTask)
Router.patch('/task/:taskId',TaskController.updateTask)

module.exports = Router


