const express = require('express')
const Router = express.Router()
const TaskController = require('../Controller/Tasks')
const Validators = require('../Controller/Validator')
const Access = require('../Controller/Access')

Router.use(Access.isAuthenticatedUser)
Router.post('/tasks',Validators.validateTasks,TaskController.createTask)
Router.get('/tasks',TaskController.getTasks)
Router.get('/task/:taskId',Validators.validateTaskId,TaskController.getTask)
Router.delete('/task/:taskId',Validators.validateTaskId,TaskController.deleteTask)
Router.patch('/task/:taskId',Validators.validateUpdateTask,TaskController.updateTask)
Router.get("/tasksFor/",Validators.validateTaskByDay,TaskController.getTasksBasedOnDay)
Router.get("/tasksWithStatus/:status",Validators.validateTasksByStatus,TaskController.getTasksBasedOnStatus)

module.exports = Router


