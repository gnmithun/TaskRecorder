const { Sequelize, INTEGER , STRING } = require('sequelize')
const dbController = require('../Database/DBController')

const Users = dbController.define('users',{    
    email:{ type : STRING, allowNull:false, unique:true},
    password : { type : STRING }
})

module.exports = {
    Users : Users
}