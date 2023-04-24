const { taskValidator, idValidator } = require("../Common/validator")
const { categoryValidator } = require("../Common/validator")
const { dateValidator } = require("../Common/validator")
const { priorityValidator } = require("../Common/validator")
const { taskByDayValidator } = require("../Common/validator")
const { taskByStatusValidator } = require("../Common/validator")
const { userValidator } = require("../Common/validator")

exports.validateCategory = (req,_,next) => {
  const { error  } = categoryValidator.validate( { categoryType : req.body.category } )
  validated(error,next)
}

exports.validateTasks = (req,_,next) => {
    const { error } = taskValidator.validate( { detail : req.body.detail, 
                                                      priority:req.body.priority, 
                                                      completed :req.body.completed, 
                                                      categoryId: req.body.categoryId } )                                                      
    validated(error,next)
}

exports.validateTaskId = (req,_,next) => {
    const { error } = idValidator.validate( { taskId:req.params.taskId } )    
    validated(error,next)
}

exports.validateUpdateTask = (req,_,next) => {
    const { error  } = taskValidator.validate( { detail : req.body.detail, 
                                                        completed : req.body.completed,
                                                        categoryId: req.body.categoryId,
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

exports.validateTaskByDay = (req,_,next) => {
    const { error } = taskByDayValidator.validate( { day:req.query.day } )
    validated(error,next)
}

exports.validateTasksByStatus = (req,_,next) => {
    const { error } = taskByStatusValidator.validate( { status: req.params.status} )
    validated(error,next)
}

exports.validateUser = (req,_,next) => {
    const { error } = userValidator.validate( { email:req.body.email, password: req.body.password } )
    validated(error,next)
}

function validated(error,next) {
    if ( error ) {
      return next( new Error(error.details[0].message))
    } 
    next()
}
