const dbController = require('../Database/DBController')
const sequelize = require('sequelize')

const Category = dbController.define("category",{
    id: { type:sequelize.INTEGER, autoIncrement:true, primaryKey:true },
    type : { type:sequelize.STRING, allowNull:false, defaultValue: "General" }
})


module.exports = Category