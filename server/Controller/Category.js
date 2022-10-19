const Category = require("../Model/Category")
const { categoryValidator } = require("../Common/validator")
const joi = require("joi")

exports.createCategory = async (req,res) => {
    const { error , value } = categoryValidator.validate( { categoryType : req.body.category } )
    if( error ) {
      return res.status(500).send( { "response" : "Error", "details" : error } )
    }
    try {
      const category = await Category.create( { type : value.categoryType } )
      return res.status(200).send( { "response" : "Success", "categories" : category } )
    } catch (error) {
      return res.status(500).send( { "response" : "Error", "details" : error } )
    }
}

exports.getCategories = async (_,res) => {
  try {
    const categories = await Category.findAll()
    return res.status(200).json( { "response" : "Success", "categories" : categories } )
  } catch (error) {
    return res.status(500).send( { "response" : "Error", "details" : error } )
  }
}