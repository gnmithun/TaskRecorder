const { Sequelize } = require('sequelize')

const dbController = new Sequelize('todos','root',{dialect:'mysql'})
//dbController.sync( { force: true } )
dbController.sync()
module.exports = dbController
