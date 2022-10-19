const express = require("express")
const cors = require('cors');
const { Sequelize } = require("sequelize")

const TaskRoutes = require('./Router/Tasks')
const CategoryRoutes = require('./Router/Category')

const dbController = require('./Database/DBController')
const Category = require('./Model/Category')
const Tasks = require('./Model/Tasks')

Tasks.belongsTo(Category)
const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded())
app.use(TaskRoutes)
app.use(CategoryRoutes)

app.listen(8000,() => {
  console.log("Server running on port 8K")
})

app.use( function (err,req,res,next) {
  return res.status(500).send( { "response" : "Error", "details" : err } )
})

/*Default error handler, always at the end of the middleware stack*/
