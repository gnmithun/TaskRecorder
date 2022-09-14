const express = require("express")
const { Sequelize } = require("sequelize")

const TaskRoutes = require('./BE/Router/Tasks')
const CategoryRoutes = require('./BE/Router/Category')

const dbController = require('./BE/Database/DBController')
const Category = require('./BE/Database/Model/Category')
const Tasks = require('./BE/Database/Model/Tasks')

const app = express()
app.use(express.json())
app.use(express.urlencoded())

app.use(TaskRoutes)
app.use(CategoryRoutes)

app.listen(8000,() => {
  console.log("Server running on port 8K")
})

