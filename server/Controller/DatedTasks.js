const Tasks = require('../Model/Tasks')
const { Op } = require("sequelize")
const moment = require('moment')

exports.getTasksBetweenDates = async (req,res,next) => {
    const from     = req.query["from"]
    const to       = req.query["to"]
    try {
        // const fromDate = moment(from).format('YYYY-MM-DD HH:MM:SS')
        // const toDate   = moment(to).format('YYYY-MM-DD HH:MM:SS')
        const tasks = await Tasks.findAll( {
            where: {
                createdAt : {
                    [Op.and] : [{
                        [Op.lt] : to
                    }, {
                        [Op.gt] : from
                    }]
                }
            }
        })
        return res.send( { status : "Success" , details : [from,to]} )
    } catch (error) {
        next(error)
    }
    
}