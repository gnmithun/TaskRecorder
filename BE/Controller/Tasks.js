const Tasks = require("../Database/Model/Tasks")

exports.createTask = async (req,res) => {
  console.log(req.body.detail)
  try {
    const newTask = await Tasks.create({ detail:req.body.detail})
    return res.status(200).send( { "response" : "Success", "details" : newTask.id } )
  } catch (error) {
    return res.status(200).send( { "response" : "Error", "details" : error } )
  }
  
}

