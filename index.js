const express = require("express")
const { Sequelize } = require("sequelize")
const TaskRoutes = require('./BE/Router/Tasks')
const app = express()

app.use(TaskRoutes)


app.listen(8000,() => {
  console.log("Connected")
  
  // const taskManagerDB = new Sequelize('taskmanager','root','RxJS@1953',{
  //   dialect:'mysql',    
  // })

  // taskManagerDB.sync()
  // .then( data => {
  //   const Tasks = taskManagerDB.define("Tasks",{
  //     detail:Sequelize.STRING,
  //     completed:Sequelize.BOOLEAN
  //   })

  // Tasks.create({
  //   detail:"Configure the database",
  //   completed:true
  // }).then( data => {

  // })

  // })

})

