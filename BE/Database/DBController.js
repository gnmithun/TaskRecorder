const { Sequelize } = require('sequelize')

const dbController = new Sequelize('todos','root','password',{dialect:'mysql'})
//dbController.sync( { force: true } )
dbController.sync()
module.exports = dbController
