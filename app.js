const express = require("express");
const bodyParser = require("body-parser");

require("colors");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extend: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000;

//* Conexion a la base de datos

const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.membbg3.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, 
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("Base de datos conectada..."))
.catch(error => console.log(error))

//* configuracion de rutas (midleware)

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/src"));
app.use(express.static(__dirname + "/imagenes"));

//* motor de plantillas

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//* Rutas Web

app.use('/', require("./router/rutasWeb"));
app.use('/mascotas', require("./router/mascotas"));


app.use((req, res, next) => {
    res.status(404).render("404");
})

//! llamada al servidor

app.listen(port, () => {
    console.log(`Server on port ${port}`.yellow);
});



