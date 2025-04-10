"use strict";
const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");


//http://localhost:3000/carts/add
//body:
//{
//  "cart_id": 1,
//  "product_id": 4,
//  "quantity": 2
//}
//
router.post("/add", cartController.addToCart);

//http://localhost:3000/carts/remove
//body:
//{
//  "product_id": 1,
//  "cart_id": 1
//}
//
router.delete("/remove", cartController.removeFromCart);


//http://localhost:3000/carts/clear
//body:
//{
//    "cart_id": 1
//}
router.delete("/clear", cartController.clearCart);











module.exports = router;