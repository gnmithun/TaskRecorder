const { Tasks, TasksView } = require("../Model/Tasks")
const { taskValidator, idValidator } = require("../Common/validator")
const Category = require("../Model/Category")
const moment = require('moment')
const { date } = require("joi")
const { Op } = require("sequelize")

exports.createTask = async (req,res,next) => {
    try {
      const newTask = await Tasks.create( { detail:req.body.detail, completed:req.body.completed, categoryId:req.body.categoryId, priority:req.body.priority } )
      return res.status(200).send( { "response" : "Success", "details" : newTask } )
    } 
    catch (error) { 
      next(error) 
    }
}

exports.getTasks = async ( _,res,next ) => {
  try {
      const data = await TasksView.findAll()
      if (data.count === 0) {
        return res.send( { "response" : "Success", "details" : [] } )
      }
      return res.send( { "response" : "Success", "details" : data } )
  } 
  catch (error) {
    next(error)
  } 
}

exports.getTasksBasedOnStatus = async (req,res,next) => {
  try{
    const data = await Tasks.findAll({
      include:Category,
      where:{ completed:mapStatus(req.params.status) }
    })
    if (data.count === 0 ){
      return res.send( { "response" : "Success", "details" : []  })
    }else {
      return res.send( { "response" : "Success", "details" : data  })
    }
  } catch ( error ) {
    next(error)
  }
}

exports.getTasksBasedOnDay = async (req,res,next) => {
  try{

    const now = new Date()
    let tasks = []

    let today = new Date()
    today.setHours(0,0,0,0)

    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday.setHours(0,0,0,0)
    if ( req.query.day === 'yesterday') {
      tasks = await Tasks.findAll({
        include: Category,
        where:{
          createdAt:{
            [Op.gte] : yesterday,
            [Op.lte] : today
          },completed:0
        }
      })
    }

    if ( req.query.day === 'today') {
        tasks = await Tasks.findAll({
          include: Category,
          where:{
            createdAt : {
              [Op.gte] : today,
              [Op.lte] : now
            },completed:0
          }
        })
    }

    if ( req.query.day === 'pending') {
      tasks = await Tasks.findAll({
        include: Category,
        where:{
          createdAt : {
            [Op.lte] : yesterday
          },completed:0
        }
      })
    }
    
    return res.send( { "response":"Success","details":tasks ,  "count":tasks.length } )  
  } 
  catch (error) {
    next(error)
  }
}

exports.getTask = async (req,res,next) => {
  const taskId = req.params.taskId
  try {  
    const task = await Tasks.findOne( {
      where:{
        id:taskId
      },
      include: Category
    })     
    if (task === null) {
      return res.send( { "response" : "Success", "details" : {} } )
    } else {
      return res.send( { "response" : "Success", "details" : task } )
    }
  } catch (error) {         
     next(error)
  }
}

exports.deleteTask = async ( req,res,next ) => {

 const taskId = req.params.taskId
 try {
    const task = await Tasks.findByPk(taskId)
    if ( task === null ){
      return res.send( { "response" : "Success", "details" : "No task with that ID" } )
    } 
    const deletedTask = await task.destroy()
    return res.send( { "response" : "Success", "details" : deletedTask } )
 } catch (error) {  
    next(error)
 }
}

exports.updateTask = async ( req,res,next ) => {
  try {
    const task = await Tasks.findByPk(req.params.taskId)
    if ( task === null ){
      return res.send( { "response" : "Success", "details" : "No task with that ID" } )
    } 
    const updatedTask = await task.update({
      detail : getUpdatedValueFor(req.body.detail,task.detail),
      completed : getUpdatedValueFor(req.body.completed,task.completed),
      categoryId : getUpdatedValueFor(req.body.categoryId,task.categoryId),
      priority : getUpdatedValueFor(req.body.priority,task.priority)
    })
    return res.send( { "response" : "Success", "details" : updatedTask } )
  } catch (error) {
    next(error)    
  }
}

function getUpdatedValueFor(updatedProperty,taskProperty) {
  return (typeof updatedProperty === "undefined" ? taskProperty : updatedProperty)
}

function mapStatus(status){
  return (status === "completed" ? 1 : 0)
}
