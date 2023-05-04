const express = require("express")
const session = require("express-session")
const cors = require('cors');

const TaskRoutes = require('./Router/Tasks')
const CategoryRoutes = require('./Router/Category')
const DatedTaskRoutes = require('./Router/DatedTasks')
const PriorityRoutes = require('./Router/Priority')
const AccessRoutes = require('./Router/Access')

const dbController = require('./Database/DBController')
const Category = require('./Model/Category')

const { Sequelize } = require("sequelize")
const { Tasks, TasksView } = require('./Model/Tasks')
const { Users } = require('./Model/Users')

Tasks.belongsTo(Category)
Tasks.belongsTo(Users)
TasksView.belongsTo(Category)

const app = express()

app.use(cors( {
  origin:'http://localhost:3000',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  credentials: true,
}));
app.use(express.json())
app.use(express.urlencoded())

app.use(session({
  name : "sessionDetails",
  secure : "true",
  secret : "E(H+MbQeShVmYq3t6w9z$C&F)J@NcRfU",
  resave : false,
}))
app.use(AccessRoutes)
app.use(DatedTaskRoutes)
app.use(PriorityRoutes)
app.use(TaskRoutes)
app.use(CategoryRoutes)

app.listen(8000,() => {
  console.log("Server running on port 8K")
})

/*Default error handler, always at the end of the middleware stack*/
app.use( function (err,req,res,next) {
  return res.send( { "response" : "Error", "details" : err.message } )
})

