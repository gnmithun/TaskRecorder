
const { Sequelize } = require('sequelize')
const dbController = require('../Database/DBController')
const { priority } = require('../Common/appConst')

const Tasks = dbController.define('tasks',{ 
    detail:{ type:Sequelize.STRING, allowNull:false },
    completed:{ type:Sequelize.BOOLEAN, defaultValue:false },
    priority:{ type:Sequelize.ENUM(...priority) },
})


module.exports = {
    Tasks:Tasks
}