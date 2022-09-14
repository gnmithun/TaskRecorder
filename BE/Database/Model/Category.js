const dbController = require('../DBController')
const sequelize = require('sequelize')
const Tasks = require('./Tasks')

const Category = dbController.define("Category",{
    id: { type:sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    type : { type:sequelize.STRING, allowNull:false, defaultValue: "General" }
})


module.exports = Category