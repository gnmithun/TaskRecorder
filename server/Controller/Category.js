const Category = require("../Model/Category")
const { categoryValidator } = require("../Common/validator")
const joi = require("joi")

exports.createCategory = async (req,res,next) => {
    const { error , value } = categoryValidator.validate( { categoryType : req.body.category } )
    if( error ) {
      return next( new Error(error.details[0].message))
    }
    try {
      const category = await Category.create( { type : value.categoryType } )
      return res.send( { "response" : "Success", "categories" : category } )
    } catch (error) {
      next(error)
    }
}

exports.getCategories = async (_,res,next) => {
  try {
    const categories = await Category.findAll()
    return res.send( { "response" : "Success", "categories" : categories } )
  } catch (error) {
    next(error)
  }
}