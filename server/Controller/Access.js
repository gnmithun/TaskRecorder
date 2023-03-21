exports.signup = (req,res,next) => {
    try {
        return res.send( { "response" : "Success", "details" : { "email" : req.body.email, "password" : req.body.password } } )
    } catch (error){
        next()
    }
}

exports.signin = (req,res,next) => {
    try {
        return res.send( { "response" : "Success", "details" : { "email" : req.body.email, "password" : req.body.password } } )
    } catch (error){
        next()
    }
}