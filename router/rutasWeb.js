const express = require("express");

const router = express.Router();

//* rutas

router.get("/", (req, res) => {
    res.render("index", {
        titulo: "mi titulo dinamico",
        archivoCss: "principal"
    });
});

router.get("/servicios", (req, res) => {
    res.render("servicios", {tituloServicios: "Titulo de los servicios"});
})


module.exports = router;
