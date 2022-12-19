const Category = require("../Model/Category")
const joi = require("joi")

exports.createCategory = async (req,res,next) => {
    const categoryType = req.body.category
    try {
      const category = await Category.create( { type : categoryType } )
      return res.send( { "response" : "Success", "details" : category } )
    } catch (error) {
      next(error)
    }
}

exports.getCategories = async (_,res,next) => {
  try {
    const categories = await Category.findAll()
    return res.send( { "response" : "Success", "details" : categories } )
  } catch (error) {
    next(error)
  }
}