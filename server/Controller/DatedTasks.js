const Tasks = require('../Model/Tasks')
const { Op } = require("sequelize")
const moment = require('moment')

exports.getTasksBetweenDates = async (req,res,next) => {
    const from     = req.query["from"]
    const to       = req.query["to"]
    try {
        const fromDate = new Date(moment(from,'DD-MM-YYYY').format('YYYY-MM-DD'))
        const toDate   = new Date(moment(to,'DD-MM-YYYY').format('YYYY-MM-DD'))
        const tasks = await Tasks.findAll( {
            where: {
                createdAt : {
                    [Op.and] : 
                      [ { [Op.or] : [ { [Op.eq] : fromDate } , { [Op.gt] : fromDate } ] },
                        { [Op.or] : [ { [Op.eq] : toDate } , { [Op.lt] : toDate } ] } ]
                }
            }
        })
        return res.send( { "response" : "Success" , details : tasks} )
    } catch (error) {
        next(error)
    }
}