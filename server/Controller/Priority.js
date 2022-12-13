exports.getTasksWithPriority = (req,res,next) => {
    try {
        return res.send( { "status" : " Success" , "details" : req.params.priority } )        
    } catch {
        next(error)
    }
}