"use strict";
const model = require("../models/productModels");
const fs = require("fs");
const path = require("path");
const multer = require('multer');


function getAll(req, res, next) {
    console.log(req.session.userId);
    try {
        console.log(model.getAll());
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

async function createProductsInBulk(req, res, next) {

    let files = req.files;

    const submitted_files = files.length;
    let bulk_text = "";
    const img_upload_dir = "./public/images/";
    let item_entries = [];





    for (let i = 0; i < submitted_files; i++) {

        if (files[i]["mimetype"] === "text/plain") {
            bulk_text = files[i].buffer.toString('utf8');
            item_entries = bulk_text.split("\r\n");
            //console.log(item_entries);

        } else if (files[i]["mimetype"].includes("image")) {
            fs.writeFile(path.join(img_upload_dir, files[i]["originalname"]), files[i].buffer, 'utf-8', (err) => {
                if (err) {
                    console.error('Error', err);
                    return;
                }
            });
        }
    }




    let valid = 1;
    let info = "";
    for (let i = 0; i < item_entries.length; i++) {

        let item_entry = item_entries[i].split(", ");


        let name = item_entry[0];
        let description = item_entry[1];
        let image_url = path.join("images/", item_entry[2]);
        let price = Number(item_entry[3]);
        let product_type = item_entry[4];




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

    let image_url = "";
    const img_upload_dir = "./public/images/";
    let file = req.files;

    if (file[0]["mimetype"].includes("image")) {
        image_url = path.join("/images/", file[0]["originalname"]);
        fs.writeFile(path.join(img_upload_dir, file[0]["originalname"]), file[0].buffer, 'utf-8', (err) => {
            if (err) {
                console.error('Error', err);
                return;
            }

        });
    }
    console.log(image_url);

    let name = req.body.name;
    let description = req.body.description;

    let price = Number(req.body.price);
    let product_type = req.body.product_type;


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

    let image_url = "";
    const img_upload_dir = "./public/images/";
    let file = req.files;

    if (file[0]["mimetype"].includes("image")) {
        image_url = path.join("/images/", file[0]["originalname"]);
        fs.writeFile(path.join(img_upload_dir, file[0]["originalname"]), file[0].buffer, 'utf-8', (err) => {
            if (err) {
                console.error('Error', err);
                return;
            }

        });
    }


    let product_id = req.body.product_id;
    let name = req.body.name;
    let description = req.body.description;
    let price = Number(req.body.price);
    let product_type = req.body.product_type;


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