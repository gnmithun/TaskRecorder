const sequelize = require('sequelize')
const { Sequelize } = require('sequelize')
const dbController = require('../DBController')

const Tasks = dbController.define('Tasks',{ 
    id:{ type:Sequelize.INTEGER, autoIncrement:true,primaryKey:true},
    detail:{ type:Sequelize.STRING, allowNull:false},
    completed:Sequelize.BOOLEAN,
})

module.exports = Tasks
