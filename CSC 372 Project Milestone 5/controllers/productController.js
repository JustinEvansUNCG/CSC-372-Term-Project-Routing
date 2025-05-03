"use strict";
const model = require("../models/productModels");

function getAll(req, res, next) {
    console.log(req.session.userId);
    try {
        console.log("tuvala" + model.getAll());
        res.json(model.getAll());
    } catch (err) {
        console.error("Error while getting products: ", err.message);
        next(err);
    }
}
function getProductDetails(req, res, next) {
    const product_id = req.query.id;
    if (product_id) {
        try {
            res.json(model.getProductDetails(product_id));
        } catch (err) {
            console.error("Error while getting products: ", err.message);
            next(err);
        }
    }
    else {
        res.status(400).send("Invalid Request");
    }
}

function getByAttributes(req, res, next) {
    const type = req.query.type;
    const name = req.query.name;
    const product_id = req.query.product_id;

    if (product_id) {
    try {
        res.json(model.getById(product_id));
    } catch (err) {
        console.error("Error while getting products: ", err.message);
        next(err);
    }

    } else if (type && name) {
        try {
            res.json(model.getByTypeAndName(type, name));
        } catch (err) {
            console.error("Error while getting products: ", err.message);
            next(err);
        }
    } else if (type) {
        try {
            res.json(model.getByType(type));
        } catch (err) {
            console.error("Error while getting products: ", err.message);
            next(err);
        }
    } else if (name) {
        try {
            res.json(model.getByName(name));
        } catch (err) {
            console.error("Error while getting products: ", err.message);
            next(err);
        }
    }
    else {
        res.status(400).send("Invalid Request");
    }
}
function createProductsInBulk(req, res, next) {
    const product_count = req.body.length;
    let info;
    let valid = 1;

    for (let i = 0; i < product_count; i++) {


        let name = req.body[i].name;
        let description = req.body[i].description;
        let image_url = req.body[i].image_url;
        let price = Number(req.body[i].price);
        let product_type = Number(req.body[i].product_type);
        



        if (name && description && image_url && price && product_type) {
            let params = [name, description, image_url, price, product_type];
            try {
                info = model.createProduct(params);
            } catch (err) {
                valid = 0;
                console.error("Error while creating product: ", err.message);
                next(err);
            }
        }
        else {
            res.status(400).send("Invalid Request");
        }
        

    }
    if (valid === 1) {
        res.json(info);

    }

}

function createProduct(req, res, next) {

    let name = req.body.name;
    let description = req.body.description;
    let image_url = req.body.image_url;
    let price = Number(req.body.price);
    let product_type = Number(req.body.product_type);


    if (name && description && image_url && price && product_type) {
        let params = [name, description, image_url, price, product_type];
        try {
            res.json(model.createProduct(params));
        } catch (err) {
            console.error("Error while creating product: ", err.message);
            next(err);
        }
    }
    else {
        res.status(400).send("Invalid Request");
    }


    
}


function deleteProduct(req, res, next) {
    
    let product_id = Number(req.body.product_id);

    if (product_id) {
        let params = [product_id];
        try {
            res.json(model.removeProduct(params));
        } catch (err) {
            console.error("Error while creating product: ", err.message);
            next(err);
        }
    }
    else {
        res.status(400).send("Invalid Request");
    }


}


function updateProduct(req, res, next) {
    let product_id = req.body.product_id;
    let name = req.body.name;
    let description = req.body.description;
    let image_url = req.body.image_url;
    let price = Number(req.body.price);
    let product_type = Number(req.body.product_type);


    if (product_id && name && description && image_url && price && product_type) {
        let params = [name, description, image_url, price, product_type, product_id];
        try {
            res.json(model.updateProduct(params));
        } catch (err) {
            console.error("Error while creating product: ", err.message);
            next(err);
        }
    }
    else {
        res.status(400).send("Invalid Request");
    }
}

function initializeDb(req, res, next) {
    try {
        res.json(model.initializeDb());
    } catch (err) {
        console.error("Error while creating product: ", err.message);
        next(err);
    } 
}






function getAllByOneAttribute(req, res, next) {
    let attribute = req.query.attribute;
    let value = req.query.value;
    if (attribute && value) {
        try {
            res.json(model.getAllByOneAttribute(attribute, value));
        } catch (err) {
            console.error("Error while getting games: ", err.message);
            next(err);
        }
    }
    else {
        res.status(400).send("Invalid Request");
    }
}

function getOneById(req, res, next) {
    try {
        res.json(model.getOneById(req.params.id));
    } catch (err) {
        console.error("Error while getting games: ", err.message);
        next(err);
    }
}

function deleteGame(req, res, next) {
    try {
        model.deleteGame(req.params.id);
        res.json(model.getAll());
    } catch (err) {
        console.error("Error while getting games: ", err.message);
        next(err);
    }
}

function createNew(req, res, next) {
    let name = req.body.name;
    let platform = req.body.platform;
    let release_year = parseInt(req.body.release_year);
    let genre = req.body.genre;
    let publisher = req.body.publisher;
    let developer = req.body.developer;
    let rating = req.body.rating;

    if (name && platform && release_year && genre && publisher && developer && rating) {
        let params = [name, platform, release_year, genre, publisher, developer, rating];
        try {
            res.json(model.createNew(params));
        } catch (err) {
            console.error("Error while creating game: ", err.message);
            next(err);
        }
    }
    else {
        res.status(400).send("Invalid Request");
    }
}

module.exports = {
    getAll,
    getByAttributes,
    getProductDetails,
    createProductsInBulk,
    createProduct,
    deleteProduct,
    updateProduct,
    initializeDb,
    getAllByOneAttribute,
    getOneById,
    deleteGame,
    createNew
};