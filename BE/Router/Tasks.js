const express = require('express')
const Router = express.Router()
const TaskController = require('../Controller/Tasks')

Router.post('/tasks',TaskController.createTask)

module.exports = Router


