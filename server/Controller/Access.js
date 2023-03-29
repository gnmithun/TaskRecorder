const hasher = require('password-hash')
const { Users }  = require('../Model/Users')
const jwt = require('jsonwebtoken')

exports. isAuthenticatedUser = async(req,res,next) => {
    try { 
             
        if ( req.headers.authorization.startsWith('Bearer') ) {
          const token = req.headers.authorization.substring(7)
          const isValidToken = jwt.verify(token,"E(H+MbQeShVmYq3t6w9z$C&F)J@NcRfU")
          if (isValidToken) {
            next()
          } else {
            res.status(401).send( { "response" : "Success", "details" : "Unauthorized" } )
          }          
        } else {
          res.status(401).send( { "response" : "Success", "details" : "Unauthorized" } )
        }
    } catch (error) {
        next(error)
    }

}

exports.signout = async (req,res,next) => {
    try {        
        res.send( { "response" : "Success", "details" : "Logged out" } )
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
            return res.send( { "response" : "Success", "details" :  " User already exists! " } )
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
                const token = jwt.sign( { email : email },"E(H+MbQeShVmYq3t6w9z$C&F)J@NcRfU", { expiresIn : 60})
                
                return res.send( { "response" : "Success", "details" : "Logged In", "token" : token } )
            }
            else{
                return res.send( { "response" : "Success", "details" : "Password Incorrect!!" } )
            }
        } else {
            return res.send( { "response" : "Success", "details" : "User not found!!" } )
        }
    } catch (error){
        next(error)
    }
}