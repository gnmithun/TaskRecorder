const Tasks = require("../Model/Tasks")
const { taskValidator, idValidator } = require("../Common/validator")
const Category = require("../Model/Category")

exports.createTask = async (req,res,next) => {
    const { error, value } = taskValidator.validate( { detail : req.body.detail , completed : req.body.completed, category: req.body.category } )
    if( error ) {
      return res.status(500).send( { "response" : "Error", "details" : error } )
    }
    try {
      const newTask = await Tasks.create( { detail:req.body.detail, completed:req.body.completed, categoryId:req.body.categoryId } )
      return res.status(200).send( { "response" : "Success", "task" : newTask } )
    } 
    catch (error) { 
      next(error) 
    }
}

exports.getTasks = async ( req,res,next ) => {
  try {
      const data = await Tasks.findAll({ include: Category })
      if (data.count === 0) {
        return res.status(200).json( { "response" : "Success", "tasks" : [] } )
      }
      return res.status(200).json( { "response" : "Success", "tasks" : data } )
  } 
  catch (err) {
    next(err)
  } 
}

exports.getTask = async (req,res,next) => {
  const { error, value } = idValidator.validate( { taskId:req.params.taskId } )    
  if ( error ) {
    return res.status(500).send( { "response" : "Error", "details" : error } )
  }
  try {  
    const task = await Tasks.findByPk(value.taskId)     
    if (task === null) {
      return res.status(404).send( { "response" : "Success", "task" : {} } )
    } else {
      return res.status(200).send( { "response" : "Success", "task" : task } )
    }
  } catch (error) {         
     next(error)
  }
}

exports.deleteTask = async ( req,res,next ) => {
 const { error , value } = idValidator.validate( { taskId: req.params.taskId} )
 if ( error ){
  return res.status(500).send( { "response" : "Error" , " details " : error } )
 }
 try {
    const task = await Tasks.findByPk(value.taskId)
    if ( task === null ){
      return res.status(404).send( { "response" : "Success", "details" : "No task with that ID" } )
    } 
    const deletedTask = await task.destroy()
    return res.status(200).send( { "response" : "Success", "details" : deletedTask } )
 } catch (error) {    
    next(error)
 }
}

exports.updateTask = async ( req,res,next ) => {
  const { error , value } = taskValidator.validate( { taskId: req.params.taskId,
                                                      detail : req.body.detail,
                                                      completed : req.body.completed,
                                                      category: req.body.category } )
  if ( error ) {
    return res.status(500).send( { "response" : "Error", "details" : error } )
  }
  try {
    const task = await Tasks.findByPk(value.taskId)
    if ( task === null ){
      return res.status(404).send( { "response" : "Success", "details" : "No task with that ID" } )
    } 
    const updatedTask = await task.update({
      detail : getUpdatedValueFor(value.detail,task.detail),
      completed : getUpdatedValueFor(value.completed,task.completed),
      categoryId : getUpdatedValueFor(value.category,task.categoryId)
    })
    return res.status(200).send( { "response" : "Success", "details" : updatedTask } )
  } catch (error) {
    next(error)    
  }
}

function getUpdatedValueFor(updatedProperty,taskProperty) {
  return (typeof updatedProperty === "undefined" ? taskProperty : updatedProperty)
}
