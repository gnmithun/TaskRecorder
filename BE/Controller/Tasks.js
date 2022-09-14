const Tasks = require("../Database/Model/Tasks")
const { taskValidator } = require("../Common/validator")

exports.createTask = async (req,res) => {
  const { error, value } = taskValidator.validate( { detail : req.body.detail , completed : req.body.completed } )
  if( error ) {
    return res.status(200).send( { "response" : "Error", "details" : error } )
  }
  try {
    const newTask = await Tasks.create( { detail:req.body.detail , completed:req.body.completed } )
    return res.status(200).send( { "response" : "Success", "details" : newTask.id } )
  } catch (error) {
    return res.status(200).send( { "response" : "Error", "details" : error } )
  }
  
}

