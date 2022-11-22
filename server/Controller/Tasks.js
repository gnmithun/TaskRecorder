const Tasks = require("../Model/Tasks")
const { taskValidator, idValidator } = require("../Common/validator")
const Category = require("../Model/Category")

exports.createTask = async (req,res,next) => {
    try {
      const newTask = await Tasks.create( { detail:req.body.detail, completed:req.body.completed, categoryId:req.body.categoryId } )
      return res.status(200).send( { "response" : "Success", "details" : newTask } )
    } 
    catch (error) { 
      next(error) 
    }
}

exports.getTasks = async ( req,res,next ) => {
  try {
      const data = await Tasks.findAll({ include: Category })
      if (data.count === 0) {
        return res.send( { "response" : "Success", "details" : [] } )
      }
      return res.send( { "response" : "Success", "details" : data } )
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
      categoryId : getUpdatedValueFor(req.body.category,task.categoryId)
    })
    return res.send( { "response" : "Success", "details" : updatedTask } )
  } catch (error) {
    next(error)    
  }
}

function getUpdatedValueFor(updatedProperty,taskProperty) {
  return (typeof updatedProperty === "undefined" ? taskProperty : updatedProperty)
}
