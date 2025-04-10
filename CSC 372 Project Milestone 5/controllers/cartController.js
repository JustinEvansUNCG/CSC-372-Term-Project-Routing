"use strict";
const model = require("../models/cartModels");



function addToCart(req, res, next) {
    let cart_id = Number(req.body.cart_id);
    let product_id = Number(req.body.product_id);
    let quantity = Number(req.body.quantity);


    if (product_id && cart_id && quantity) {
        let params = [cart_id, product_id, quantity];
        try {
            res.json(model.addToCart(params));
        } catch (err) {
            console.error("Error while creating cart item: ", err.message);
            next(err);
        }
    }
    else {
        res.status(400).send("Invalid Request");
    }
}

function removeFromCart(req, res, next) {
    let product_id = req.body.product_id;
    let cart_id = req.body.cart_id;

    if (product_id && cart_id) {
        let params = [product_id, cart_id];
        try {
            res.json(model.removeFromCart(params));
        } catch (err) {
            console.error("Error while removing cart item: ", err.message);
            next(err);
        }
    }
    else {
        res.status(400).send("Invalid Request");
    }
}

function clearCart(req, res, next) {
    let cart_id = req.body.cart_id;
    if (cart_id) {
        try {
            res.json(model.clearCart(cart_id));
        } catch (err) {
            console.error("Error while checking out: ", err.message);
            next(err);
        }
    }
    else {
        res.status(400).send("Invalid Request");
    }
}









module.exports = {
    addToCart,
    removeFromCart,
    clearCart
};