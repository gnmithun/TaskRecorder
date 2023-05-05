const hasher = require('password-hash')
const { Users }  = require('../Model/Users')

exports. isAuthenticatedUser = async(req,res,next) => {
    try {            
       if (req.session.userId ){
          next()        
       } else {
          res.status(401).send( { "response" : "Error", "details" : "Unauthorized" } )
        }
    } catch (error) {
        next(error)
    }
}

exports.signout = async (req,res,next) => {
    try {        
        req.session = null
        res.clearCookie(['sessionDetails'])
        return res.send( { "response" : "Success", "details" : "Logged out and cookie removed. Hoepfully!" } )
    } catch ( error ) {
        next(error)
    }
}

exports.signup = async (req,res,next) => {
  
    try {
        const email = req.body.email
        const password = req.body.password 
        const user = await Users.findOne( {where: { email : email } } )
        if ( user !== null ) {
            return res.send( { "response" : "Error", "details" :  " User already exists! " } )
        } else {
            const hashPassword = hasher.generate(password)            
            const user = await Users.create( { email:email, password:hashPassword } )
            return res.send( { "response" : "Success", "details" : { "email" : user.email } } )
        }
    } catch (error){
        next(error)
    }
}

exports.signin = async (req,res,next) => {
    try {
        const email = req.body.email
        const password = req.body.password
        
        const user = await Users.findOne( { where : { email : email } } )
        if ( user !== null ) {
            const hashedPassword = user.password
            const isPasswordCorrect = hasher.verify(password,hashedPassword)

            if (isPasswordCorrect) {                
                req.session.userId = user.id
                return res.send( { "response" : "Success", "details" : "Logged In" } )
            }
            else{
                return res.send( { "response" : "Error", "details" : "Password Incorrect!!" } )
            }
        } else {
            return res.send( { "response" : "Error", "details" : "User not found!!" } )
        }
    } catch (error){
        next(error)
    }
}