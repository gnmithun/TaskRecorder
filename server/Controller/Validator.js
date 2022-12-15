const { taskValidator, idValidator } = require("../Common/validator")
const { categoryValidator } = require("../Common/validator")
const { dateValidator } = require("../Common/validator")
const { priorityValidator } = require("../Common/validator")

exports.validateCategory = (req,_,next) => {
  const { error  } = categoryValidator.validate( { categoryType : req.body.category } )
  validated(error,next)
}

exports.validateTasks = (req,_,next) => {
    const { error } = taskValidator.validate( { detail : req.body.detail, 
                                                      priority:req.body.priority, 
                                                      completed :req.body.completed, 
                                                      category: req.body.category } )                                                      
    validated(error,next)
}

exports.validateTaskId = (req,_,next) => {
    const { error } = idValidator.validate( { taskId:req.params.taskId } )    
    validated(error,next)
}

exports.validateUpdateTask = (req,_,next) => {
    const { error  } = taskValidator.validate( { detail : req.body.detail, 
                                                        completed : req.body.completed,
                                                        category: req.body.category,
                                                        priority:req.body.priority } )
    validated(error,next)
}

exports.validateDates = (req,_,next) => {
    const { error } = dateValidator.validate( { from : req.query["from"], to : req.query["to"] })
    validated(error,next)
}

exports.validatePriority = (req,_,next) => {
    const { error } = priorityValidator.validate( { priority : req.params.priority } )
    validated(error,next)
}

function validated(error,next) {
    if ( error ) {
      return next( new Error(error.details[0].message))
    } 
    next()
}
