// const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const path = require('path')
const CustomError = require('../errors')

const uploadProductImage = async (req, res) => {   
  if (!req.files){
    throw new CustomError.BadRequestError('no file upload')
  }
  let productImage = req.file.image 
  if (!productImage.mine)
  throw new CustomError.BadRequestError('No File Uploaded');

  const imagePath = path.join(__dirname,'../public/uploads/'+ `${productImage.name}`)
  await productImage.mv(imagePath)
  return res.status(StatusCodes.OK).json({image:{src:`uploads/${productImage.name}`}})
  // const product = await Product.create(req.body);
 // res.send("Image is uploaded image");
};


module.exports = {
  uploadProductImage
};