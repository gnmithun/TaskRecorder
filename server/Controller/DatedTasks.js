const { Tasks } = require('../Model/Tasks')
const { Op } = require("sequelize")
const moment = require('moment')
const Category = require('../Model/Category')
const { createTasksViewForTenants } = require('../Common/tenant')
const { TasksView } = require("../Model/Tasks")

exports.getTasksBetweenDates = async (req,res,next) => {
    const from     = req.query["from"]
    const to       = req.query["to"]
    try {
        await createTasksViewForTenants(req.session.userId)
        const fromDate = new Date(moment(from,'DD-MM-YYYY').format('YYYY-MM-DD'))
        const toDate   = new Date(moment(to,'DD-MM-YYYY').format('YYYY-MM-DD'))
        const tasks = await TasksView.findAll( {
            where: {
                createdAt : {
                    [Op.and] : 
                      [ { [Op.or] : [ { [Op.eq] : fromDate } , { [Op.gt] : fromDate } ] },
                        { [Op.or] : [ { [Op.eq] : toDate } , { [Op.lt] : toDate } ] } ]
                }
            },include: Category
        })
        return res.send( { "response" : "Success" , details : tasks} )
    } catch (error) {
        next(error)
    }
}