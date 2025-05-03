"use strict";
const model = require("../models/cartModels");

function itemsInCart(req, res, next) {
    let user_id = req.session.userId;


    if (user_id) {
        let params = [user_id];
        try {
            console.log(model.itemsInCart(params));
            res.json(model.itemsInCart(params));
        } catch (err) {
            console.error("Error while getting items: ", err.message);
            next(err);
        }
    } else {
        res.status(400).send("Invalid Request");
    }
}


function addToCart(req, res, next) {
    let user_id = req.session.userId;
    let product_id = Number(req.body.product_id);
    //let quantity = Number(req.body.quantity);


    if (product_id && user_id) {
        let params = [user_id, product_id];
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
    let user_id = req.session.userId;

    if (product_id &&  user_id) {
        let params = [product_id, user_id];
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
    let user_id = req.session.userId;
    if (user_id) {
        try {
            res.json(model.clearCart(user_id));
        } catch (err) {
            console.error("Error while checking out: ", err.message);
            next(err);
        }
    }
    else {
        res.status(400).send("Invalid Request");
    }
}


function createCart(req, res, next) {
    let date_created = new Date().toISOString().substring(0, 10);
    let user_id = req.session.userId;
    console.log("jfioew");

    let params = [date_created, user_id];
    try {
        res.json(model.createCart(params));
    } catch (err) {
        console.error("Error while creating cart item: ", err.message);
        next(err);
    }




}

function updateCart(req, res, next) {
    let product_id = req.body.product_id;
    let user_id = req.session.userId;
    let quantity = req.body.quantity;
    


    if (product_id && user_id && quantity) {
        let params = [product_id, user_id, quantity];
        try {
            res.json(model.updateCart(params));
        } catch (err) {
            console.error("Error while creating product: ", err.message);
            next(err);
        }
    }
    else {
        res.status(400).send("Invalid Request");
    }
}




module.exports = {
    itemsInCart,
    addToCart,
    removeFromCart,
    clearCart,
    createCart,
    updateCart
};