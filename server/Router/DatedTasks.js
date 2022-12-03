const express = require('express')
const Router = express.Router()
const DatedTasks = require('../Controller/DatedTasks')
const Validators = require('../Controller/Validator')

Router.get('/datedTasks',Validators.validateDates,DatedTasks.getTasksBetweenDates)

module.exports = Router