const joi = require('joi').extend(require('@joi/date'))

const appConst = require('./appConst')

const taskValidator = joi.object({
    detail:joi.string().trim().min(5).max(100),
    priority:joi.string().valid(...(appConst.priority)),
    completed:joi.bool(),
    category:joi.number(),
})

const categoryValidator = joi.object({
    categoryType:joi.string().trim().min(1).max(30)
})

const idValidator = joi.object({
  taskId:joi.number()
})

const dateValidator = joi.object({
    from:joi.date().format(['D-M-YYYY','DD-MM-YYYY']),
    to:joi.date().format(['D-M-YYYY','DD-MM-YYYY'])
})

const priorityValidator = joi.object({
    priority:joi.string().valid(...(appConst.priority))
})

const taskByDayValidator = joi.object({
    day:joi.string().valid(...(appConst.taskDays))
})

const taskByStatusValidator = joi.object({
    status:joi.string().valid(...(appConst.taskStatus))
})

const userValidator = joi.object({
    email:joi.string().email().max(45),
    password:joi.string()
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