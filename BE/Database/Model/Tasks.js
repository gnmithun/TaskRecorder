const sequelize = require('sequelize')
const { Sequelize } = require('sequelize')
const dbController = require('../DBController')
const Category = require('./Category')

const Tasks = dbController.define('Tasks',{ 
    id:{ type:Sequelize.INTEGER, autoIncrement:true,primaryKey:true },
    detail:{ type:Sequelize.STRING, allowNull:false },
    completed:{ type:Sequelize.BOOLEAN, defaultValue:false }
})

module.exports = Tasks
