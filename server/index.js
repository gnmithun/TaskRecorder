const express = require("express")
const session = require("express-session")

const cors = require('cors');
const { Sequelize } = require("sequelize")

const TaskRoutes = require('./Router/Tasks')
const CategoryRoutes = require('./Router/Category')
const DatedTaskRoutes = require('./Router/DatedTasks')
const PriorityRoutes = require('./Router/Priority')
const AccessRoutes = require('./Router/Access')

const dbController = require('./Database/DBController')
const Category = require('./Model/Category')
const { Tasks } = require('./Model/Tasks')
const { Users } = require('./Model/Users')

Tasks.belongsTo(Category)
Tasks.belongsTo(Users)

const app = express()

app.use(session({
  secret: 'top secret',
  resave: false,
  saveUninitialized: false,
}))

app.use(cors());
app.use(express.json())
app.use(express.urlencoded())

app.use(CategoryRoutes)
app.use(DatedTaskRoutes)
app.use(PriorityRoutes)
app.use(AccessRoutes)
app.use(TaskRoutes)

app.listen(8000,() => {
  console.log("Server running on port 8K")
})

/*Default error handler, always at the end of the middleware stack*/
app.use( function (err,req,res,next) {
  return res.send( { "response" : "Error", "details" : err.message } )
})

