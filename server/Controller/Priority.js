exports.getTasksWithPriority = (req,res,next) => {
    console.log(req.params.priority)
    try {
        return res.send( { "status" : " Success" , "details" : req.params.priority } )        
    } catch {
        next(error)
    }
}