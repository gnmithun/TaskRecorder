const joi = require('joi').extend(require('@joi/date'))

const appConst = require('./appConst')

const taskValidator = joi.object({
    detail:joi.string().trim().min(5).max(100).exist(),
    priority:joi.string().valid(...(appConst.priority)).exist(),
    completed:joi.bool().exist(),
    categoryId:joi.number().exist(),
})

const categoryValidator = joi.object({
    categoryType:joi.string().trim().min(1).max(30).exist()
})

const idValidator = joi.object({
  taskId:joi.number()
})

const dateValidator = joi.object({
    from:joi.date().format(['D-M-YYYY','DD-MM-YYYY']).exist(),
    to:joi.date().format(['D-M-YYYY','DD-MM-YYYY']).exist()
})

const priorityValidator = joi.object({
    priority:joi.string().valid(...(appConst.priority))
})

const taskByDayValidator = joi.object({
    day:joi.string().valid(...(appConst.taskDays)).exist()
})

const taskByStatusValidator = joi.object({
    status:joi.string().valid(...(appConst.taskStatus))
})

const userValidator = joi.object({
    email:joi.string().email().max(45).exist(),
    password:joi.string().exist()
})

module.exports = {
    taskValidator:taskValidator,
    categoryValidator:categoryValidator,
    idValidator:idValidator,
    dateValidator:dateValidator,
    priorityValidator:priorityValidator,
    taskByDayValidator:taskByDayValidator,
    taskByStatusValidator:taskByStatusValidator,
    userValidator:userValidator
}