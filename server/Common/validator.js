const joi = require('joi').extend(require('@joi/date'))

const { priority } = require('./appConst')

const taskValidator = joi.object({
    detail:joi.string().trim().min(5).max(100),
    priority:joi.string().valid(...priority),
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

module.exports = {
    taskValidator:taskValidator,
    categoryValidator:categoryValidator,
    idValidator:idValidator,
    dateValidator:dateValidator
}