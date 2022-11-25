const { taskValidator, idValidator } = require("../Common/validator")
const { categoryValidator } = require("../Common/validator")


exports.validateCategory = (req,res,next) => {
  const { error , value } = categoryValidator.validate( { categoryType : req.body.category } )
  validated(error,next)
}

exports.validateTasks = (req,res,next) => {
    const { error, value } = taskValidator.validate( { detail : req.body.detail, 
                                                      priority:req.body.priority, 
                                                      completed :req.body.completed, 
                                                      category: req.body.category } )                                                      
    validated(error,next)
}

exports.validateTaskId = (req,res,next) => {
    const { error, value } = idValidator.validate( { taskId:req.params.taskId } )    
    validated(error,next)
}

exports.validateUpdateTask = (req,res,next) => {
    const { error , value } = taskValidator.validate( { taskId: req.params.taskId, 
                                                        detail : req.body.detail, 
                                                        completed : req.body.completed,
                                                        category: req.body.category } )
    validated(error,next)
}

function validated(error,next) {
    if ( error ) {
      return next( new Error(error.details[0].message))
    } 
    next()
}
