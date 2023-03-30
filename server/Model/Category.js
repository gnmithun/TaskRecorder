const dbController = require('../Database/DBController')
const sequelize = require('sequelize')

const Category = dbController.define("category",{
    type : { type:sequelize.STRING, allowNull:false, defaultValue: "General" }
})


module.exports = Category