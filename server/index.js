const express = require("express")
const cors = require('cors');
const { Sequelize } = require("sequelize")

const TaskRoutes = require('./Router/Tasks')
const CategoryRoutes = require('./Router/Category')
const DatedTaskRoutes = require('./Router/DatedTasks')
const PriorityRoutes = require('./Router/Priority')

const dbController = require('./Database/DBController')
const Category = require('./Model/Category')
const { Tasks, TasksView } = require('./Model/Tasks')

Tasks.belongsTo(Category)
TasksView.belongsTo(Category)
const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded())
app.use(TaskRoutes)
app.use(CategoryRoutes)
app.use(DatedTaskRoutes)
app.use(PriorityRoutes)

app.listen(8000,() => {
  console.log("Server running on port 8K")
})

/*Default error handler, always at the end of the middleware stack*/
app.use( function (err,req,res,next) {
  return res.send( { "response" : "Error", "details" : err.message } )
})

