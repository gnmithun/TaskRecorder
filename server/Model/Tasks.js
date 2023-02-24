const sequelize = require('sequelize')
const { Sequelize } = require('sequelize')
const dbController = require('../Database/DBController')
const { priority } = require('../Common/appConst')

const Tasks = dbController.define('tasks',{ 
    detail:{ type:Sequelize.STRING, allowNull:false },
    completed:{ type:Sequelize.BOOLEAN, defaultValue:false },
    priority:{ type:Sequelize.ENUM(...priority) },
    userid:{ type:Sequelize.INTEGER}
})

const TasksView = dbController.define('tasks_view',{ 
    detail:{ type:Sequelize.STRING, allowNull:false },
    completed:{ type:Sequelize.BOOLEAN, defaultValue:false },
    priority:{ type:Sequelize.ENUM(...priority) }
},{
    tableName:'tasks_view',
    timestamps:false,
    type:'view'
})

module.exports = {
    Tasks:Tasks,
    TasksView:TasksView
}