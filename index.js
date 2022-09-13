const express = require("express")
const { Sequelize } = require("sequelize")
const TaskRoutes = require('./BE/Router/Tasks')
const dbController = require('./BE/Database/DBController')
const app = express()
app.use(express.json())
app.use(express.urlencoded())
const Tasks = require("./BE/Database/Model/Tasks")
app.use(TaskRoutes)

app.listen(8000,() => {
  console.log("Server running on port 8K")
})

