const joi = require('joi')
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

module.exports = {
    taskValidator:taskValidator,
    categoryValidator:categoryValidator,
    idValidator:idValidator
}