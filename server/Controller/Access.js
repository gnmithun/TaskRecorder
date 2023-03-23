const hasher = require('password-hash')
const { Users }  = require('../Model/Users')
const jwt = require('jsonwebtoken')

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
                const token = jwt.sign({ email : email },"E(H+MbQeShVmYq3t6w9z$C&F)J@NcRfU")
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