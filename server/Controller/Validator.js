const { taskValidator, idValidator } = require("../Common/validator")

exports.validateTasks = (req,res,next) => {
    const { error, value } = taskValidator.validate( { detail : req.body.detail , completed :req.body.completed, category: req.body.category } )
    if( error ) {
      return next( new Error(error.details[0].message) )
    }
    next()
}

exports.validateTaskId = (req,res,next) => {
    const { error, value } = idValidator.validate( { taskId:req.params.taskId } )    
    if( error ) {
      return next( new Error(error.details[0].message))
    }
    next()
}

exports.validateUpdateTask = (req,res,next) => {
    const { error , value } = taskValidator.validate( { taskId: req.params.taskId, detail : req.body.detail, 
                                                    completed : req.body.completed,category: req.body.category } )
    if ( error ) {
        return next( new Error(error.details[0].message))
    } 
    next()
}
