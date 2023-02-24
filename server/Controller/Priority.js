const { Tasks } = require('../Model/Tasks')
const priority = require('../Common/appConst')
const Category = require('../Model/Category')

exports.getTasksWithPriority = async (req,res,next) => {
    try {
        const priority = req.params.priority
        const tasks = await Tasks.findAll( { where : { priority : priority }, include: Category } )
        return res.send( { "response" : "Success" , "details" : tasks } )    
    } catch (error){
        next(error)
    }
}

exports.getPriorities = (_,res,next) => {
    try {
        res.send( { "response" : "Success" , "details" : priority} )
    } catch (error) {
        next(error)
    }
}