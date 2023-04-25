const { Tasks } = require('../Model/Tasks')
const priority = require('../Common/appConst')
const Category = require('../Model/Category')
const { createTasksViewForTenants } = require('../Common/tenant')
const { TasksView } = require("../Model/Tasks")

exports.getTasksWithPriority = async (req,res,next) => {
    try {
        await createTasksViewForTenants(req.session.userId)
        const priority = req.params.priority
        const tasks = await TasksView.findAll( { where : { priority : priority }, include: Category } )
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