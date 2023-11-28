// const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const path = require('path')
const CustomError = require('../errors')

const uploadProductImage = async (req, res) => { 
  let productImage = req.file.image   
  if (!req.files){
    throw new CustomError.BadRequestError('no file upload')
  }
  

  
  if (!productImage.minetype.startsWith("image")){
  throw new CustomError.BadRequestError('No File Uploaded');
}
const maxSize  = 1024 * 1024
if (!productImage.size > maxSize){
 throw new CustomError.BadRequestError('please upload image smaller than 1MB')
}

  const imagePath = path.join(__dirname,'../public/upload /'+ `${productImage.name}`)
  await productImage.mv(imagePath)
  return res.status(StatusCodes.OK).json({image:{src:`uploads/${productImage.name}`}})
  // const product = await Product.create(req.body);
 // res.send("Image is uploaded image");
};


module.exports = {
  uploadProductImage
};