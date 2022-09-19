const joi = require('joi')

const taskValidator = joi.object({
    detail:joi.string().trim().min(5).max(30),
    completed:joi.bool().required(),
    category:joi.number()
})

const categoryValidator = joi.object({
    categoryType:joi.string().trim().min(1).max(30)
})

module.exports = {
    taskValidator:taskValidator,
    categoryValidator:categoryValidator
}