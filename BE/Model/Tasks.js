const sequelize = require('sequelize')
const { Sequelize } = require('sequelize')
const dbController = require('../Database/DBController')

const Tasks = dbController.define('tasks',{ 
    detail:{ type:Sequelize.STRING, allowNull:false },
    completed:{ type:Sequelize.BOOLEAN, defaultValue:false }
})

module.exports = Tasks
