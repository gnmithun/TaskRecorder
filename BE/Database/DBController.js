const { Sequelize } = require('sequelize')

const dbController = new Sequelize('todos','root','password',{dialect:'mysql'})
dbController.sync()
module.exports = dbController
