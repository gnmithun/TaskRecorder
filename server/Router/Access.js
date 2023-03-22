const Router = require('express').Router()
const access = require('../Controller/Access')
const Validators = require('../Controller/Validator')

Router.post('/signup',access.signup)
Router.post('/signin',Validators.validateUser,access.signin)


module.exports = Router


