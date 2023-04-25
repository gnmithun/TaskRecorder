const express = require('express')
const Router = express.Router()
const DatedTasks = require('../Controller/DatedTasks')
const Validators = require('../Controller/Validator')
const Access = require('../Controller/Access')

Router.use(Access.isAuthenticatedUser)
Router.get('/datedTasks',Validators.validateDates,DatedTasks.getTasksBetweenDates)

module.exports = Router