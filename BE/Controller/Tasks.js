const Tasks = require("../Model/Tasks")
const { taskValidator } = require("../Common/validator")
const Category = require("../Model/Category")

exports.createTask = async (req,res) => {
  const { error, value } = taskValidator.validate( { detail : req.body.detail , completed : req.body.completed, category: req.body.category } )
  if( error ) {
    return res.status(200).send( { "response" : "Error", "details" : error } )
  }
  try {
    const newTask = await Tasks.create( { detail:value.detail, completed:value.completed, categoryId:value.category } )
    return res.status(200).send( { "response" : "Success", "details" : newTask.id } )
  } catch (error) {
    return res.status(200).send( { "response" : "Error", "details" : error } )
  }
}

exports.getTasks = async ( req,res ) => {
  const tasks = await Tasks.findAll({ include: Category })
  console.log(JSON.stringify(tasks, null, 1));
  try {
    const tasks = await Tasks.findAll()
      return res.status(200).send( { "response" : "Success", "tasks" : tasks } )
  } catch (error) {
      return res.status(200).send( { "response" : "Error", "error" : error } )
  } 
}

