
const { Sequelize } = require('sequelize')
const dbController = require('../Database/DBController')
const { priority } = require('../Common/appConst')

const Tasks = dbController.define('tasks',{ 
    detail:{ type:Sequelize.STRING, allowNull:false },
    completed:{ type:Sequelize.BOOLEAN, defaultValue:false },
    priority:{ type:Sequelize.ENUM(...priority) },
})

const TasksView = dbController.define('tasksview',{ 
    detail:{ type:Sequelize.STRING, allowNull:false },
    completed:{ type:Sequelize.BOOLEAN, defaultValue:false },
    priority:{ type:Sequelize.ENUM(...priority) },
})

TasksView.sync = () => Promise.resolve();

module.exports = {
    Tasks:Tasks,
    TasksView:TasksView
}