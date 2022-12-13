const Router = require('express').Router()
const Priority = require('../Controller/Priority')
const Validators = require('../Controller/Validator')

Router.get('/priority/:priority',Validators.validatePriority,Priority.getTasksWithPriority)

module.exports = Router