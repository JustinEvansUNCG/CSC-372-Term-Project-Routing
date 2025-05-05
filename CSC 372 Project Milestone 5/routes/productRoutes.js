"use strict";
const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload_data = multer();

const productController = require("../controllers/productController");

//This route must be called for the others to work
//Request: http://localhost:3000/products/initialize
router.post("/initialize", productController.initializeDb);


//http://localhost:3000/products/all
router.get("/all", productController.getAll);

//Request: http://localhost:3000/products?type=1&name=nvid
//Request: http://localhost:3000/products/?type=1
//Request: http://localhost:3000/products/?name=nvid
router.get("/", productController.getByAttributes);



//Request: http://localhost:3000/products/add
// Body:
// {
//     "name": "new gpu",
//     "description": "A wacky new gpu",
//     "image_url": "A/wacky/dir.jpg",
//     "price": 4.99,
//     "product_type": 1
// }
router.post("/add", productController.createProduct);


//Request: http://localhost:3000/products/remove
// Body:
// {
//     "product_id": 1
// }
router.post("/remove", productController.deleteProduct);


//Request: http://localhost:3000/products/update
// Body:
// {
//     "product_id": 5,
//     "name": "new gpu",
//     "description": "A wacky nerrw gpu",
//     "image_url": "A/wacky/dirrrr.jpg",
//     "price": 5.99,
//     "product_type": 1
// }
router.post("/update", productController.updateProduct);


//Request: http://localhost:3000/products/bulk/add
// body:
// [
//     {
//     "name": "new2 gpu",
//     "description": "A wack22y new gpu",
//     "image_url": "A/wac3ky/dir.jpg",
//     "price": 10000.99,
//     "product_type": 1
//   },
//    {
//     "name": "new3 gpu",
//     "description": "A wac11ky new gpu",
//     "image_url": "A/wac2ky/dir.jpg",
//     "price": 400.99,
//     "product_type": 1
//   } 
//   ]
router.post("/bulk/add", productController.createProductsInBulk);




//Request: http://localhost:3000/products/details?id=1
router.get("/details", productController.getProductDetails);


module.exports = router;