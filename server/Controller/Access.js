const hasher = require('password-hash')
const { Users }  = require('../Model/Users')

exports.signup = async (req,res,next) => {
  
    try {
        const email = req.body.email
        const password = req.body.password
        
        const user = await Users.findOne({
          where: {
            email : email
          }            
        })
        if ( user !== null ) {
            return res.send( { "response" : "Success", "details" :  " User already exists! " } )
        } else {
            const hashPassword = hasher.generate(req.body.password)            
            const newTask = await Users.create( { email:email, password:hashPassword } )
            return res.send( { "response" : "Success", "details" : { "email" : req.body.email } } )
        }
    } catch (error){
        next(error)
    }
}

exports.signin = (req,res,next) => {
    try {
        const hashedPassword = "sha1$0e8d9895$1$8f2a1bed89e032ae8f906a27546731263ee5d041"
        const isPasswordCorrect = hasher.verify(req.body.password,hashedPassword)
        return res.send( { "response" : "Success", "details" : { "email" : req.body.email, "password" : req.body.password, "isPasswordVerified" : isPasswordCorrect } } )
    } catch (error){
        next()
    }
}