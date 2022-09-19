const Category = require("../Model/Category")
const { categoryValidator } = require("../Common/validator")
const joi = require("joi")

exports.createCategory = async (req,res,next) => {
    const { error , value } = categoryValidator.validate( { categoryType : req.body.category } )
    if( error ) {
      return res.status(500).send( { "response" : "Error", "details" : error } )
    }
    try {
      const category = await Category.create( { type : value.categoryType } )
      return res.status(200).send( { "response" : "Success", "details" : category.id } )
    } catch (error) {
      return res.status(500).send( { "response" : "Error", "details" : error } )
    }
}