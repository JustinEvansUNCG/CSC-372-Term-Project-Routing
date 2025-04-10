"use strict";
const express = require("express");
const app = express();
app.get("/home", function (req, res) {
    res.send("Hello, World from Express!");
});



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const multer = require("multer"); // for multipart/form-data
app.use(multer().none());

//const Database = require("better-sqlite3");



const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const { db_close } = require("./models/db-conn");


app.use(express.static("public"));
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);








// //http://localhost:3000/products/all
// app.get("/products/all", async function (req, res) {
//     try {
        
//         let qry = "SELECT name, image_url, price FROM Products; ";
//         let stmt = db.prepare(qry);
//         let rows = stmt.all();
//         res.json(rows);
        
        
//     } catch (err) {
//         res.type("text");
//         res.status(500).send("Server Error: " + err);
//     }
// });

// //http://localhost:3000/product/1
// app.get("/product/:id", async function (req, res) {
//     try {
//         const product_id = Number(req.params.id);
//         let qry = "SELECT * FROM Products " 
//         + "WHERE product_id=" + product_id + ";";
//         let stmt = db.prepare(qry);
//         let rows = stmt.all();
//         res.json(rows);
        
        
//     } catch (err) {
//         res.type("text");
//         res.status(500).send("Server Error: " + err);
//     }
// });

// //Request: http://localhost:3000/products/combo/1/nvid
// app.get("/products/combo/:type/:search", async function (req, res) {
//     try {
//         const type = Number(req.params.type);
//         const search = String(req.params.search);
        
        
//         let qry = "SELECT name, image_url, price FROM Products "
//         + "WHERE name LIKE '%" + search + "%' AND product_type=" + type + ";";
//         let stmt = db.prepare(qry);
//         let rows = stmt.all();
//         res.json(rows);
        
        
//     } catch (err) {
//         res.type("text");
//         res.status(500).send("Server Error: " + err);
//     }
// });


// //Request: http://localhost:3000/products/search/nvid
// app.get("/products/search/:search", async function (req, res) {
//     try {
//         const search = String(req.params.search);
        
        
//         let qry = "SELECT name, image_url, price FROM Products "
//         + "WHERE name LIKE '%" + search + "%';";
//         let stmt = db.prepare(qry);
//         let rows = stmt.all();
//         res.json(rows);
        
        
//     } catch (err) {
//         res.type("text");
//         res.status(500).send("Server Error: " + err);
//     }
// });

// //Request: http://localhost:3000/products/type/2
// app.get("/products/type/:type", async function (req, res) {
//     try {
//         const type = Number(req.params.type);
        
        
//         let qry = "SELECT name, image_url, price FROM Products "
//         + "WHERE product_type=" + type + ";";
//         let stmt = db.prepare(qry);
//         let rows = stmt.all();
//         res.json(rows);
        
        
//     } catch (err) {
//         res.type("text");
//         res.status(500).send("Server Error: " + err);
//     }
// });




const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log('Example app listening on port: ' + PORT + "!");
});