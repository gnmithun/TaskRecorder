const Category = require("../Database/Model/Category")

exports.createCategory = async (req,res,next) => {
    try {
        const category = await Category.create( { category : req.body.category } )
        return res.status(200).send( { "response" : "Success", "details" : category.id } )
      } catch (error) {
        return res.status(200).send( { "response" : "Error", "details" : error } )
      }
}