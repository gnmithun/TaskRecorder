const Router = require('express').Router()
const Priority = require('../Controller/Priority')
const Validators = require('../Controller/Validator')

Router.get('/priority/:priority',Validators.validatePriority,Priority.getTasksWithPriority)
Router.get('/priorities',Priority.getPriorities)

module.exports = Router