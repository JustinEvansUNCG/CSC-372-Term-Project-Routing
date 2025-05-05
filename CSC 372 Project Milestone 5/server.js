"use strict";
const express = require("express");
const app = express();
app.get("/home", function (req, res) {
    console.log(req.session.userId);
    res.send("Hello, World from Express!");
});



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const multer = require("multer"); // for multipart/form-data
app.use(multer().any());

//const Database = require("better-sqlite3");



//auth
const session = require('express-session');
const current_session = new session.MemoryStore();


app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false,
  store: current_session,
  cookie: {
    checkPeriod: 10000000,
  }
}));

//console.log(session.userID)

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");
const { db_close } = require("./models/db-conn");


app.use(express.static("public"));
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);





const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log('Example app listening on port: ' + PORT + "!");
});