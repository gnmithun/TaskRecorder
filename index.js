const express = require("express")
const { Sequelize } = require("sequelize")
const TaskRoutes = require('./BE/Router/Tasks')
const dbController = require('./BE/Database/DBController')
const app = express()

app.use(TaskRoutes)


app.listen(8000,() => {
  
  const Tasks = dbController.define("Tasks", { detail:Sequelize.STRING,completed:Sequelize.BOOLEAN } )

  Tasks.create({
    detail:"Configure the database",
    completed:true
  }).then( data => {

  }).catch( error => console.log(error))

  dbController.sync()
})

