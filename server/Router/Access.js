const Router = require('express').Router()
const access = require('../Controller/Access')
const Validators = require('../Controller/Validator')

Router.post('/signin',Validators.validateUser,access.signin)
Router.post('/signout',access.signout)

module.exports = Router


