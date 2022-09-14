const joi = require('joi')

const taskValidator = joi.object({
    detail:joi.string().trim().min(5).max(30),
    completed:joi.bool().required()
})

module.exports = {
    taskValidator:taskValidator
}