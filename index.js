const express = require("express")
const { Sequelize } = require("sequelize")
const app = express.application
app.listen(8000,() => {
  const database = new Sequelize('taskmanager','root','RxJS@1953',{
    dialect:'mysql'
  })
  console.log(database)
})

