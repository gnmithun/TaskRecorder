const Router = require('express').Router
const access = require('../Controller/Access')

//Get for signup page
//Get for signin page

Router.post('/signup',access.signup)
Router.post('/signin',access.signin)


