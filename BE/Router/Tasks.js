const express = require('express')
const Router = express.Router()
const TaskController = require('../Controller/Tasks')

Router.get('/tasks',TaskController.createTask)

module.exports = Router


