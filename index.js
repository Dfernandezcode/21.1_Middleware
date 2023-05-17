const express = require("express");
const { bookRouter } = require("./routes/book.routes.js");
const { authorRouter } = require("./routes/author.routes.js");
const { connect } = require("./db.js");
const cors = require("cors");
const { fileUploadRouter } = require("./routes/file-upload.routes.js");

const main = async () => {
  // Conexión a la BBDD
  const database = await connect();

  // Configuración del app
  const PORT = 3000;
  const app = express();
  app.use(express.json()); // server.use = app.use
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

  // Rutas
  const router = express.Router();
  router.get("/", (req, res) => {
    res.send(`Esta es la home de nuestra API. Conectados a la BBDD ${database.connection.name}`);
  });
  router.get("*", (req, res) => {
    res.status(404).send("Lo sentimos :( No hemos encontrado la página solicitada.");
  });

  // Application Middlewares
  app.use((req, res, next) => {
    const date = new Date();
    console.log(`Petición de tipo ${req.method} a la url ${req.originalUrl} el ${date}`);
    next();
  });

  // Acepta /book/*
  app.use("/book", (req, res, next) => {
    console.log("Books have been requested!");
    next();
  });

  // Middleware - error management.
  // !! NOTE: ORDER OF PARAMETERS IS KEY.

  app.use((err, req, res, next) => {
    console.log("*** Start of Error ***");
    console.log(`REQUEST FAILED: ${req.method} of URL ${req.originalUrl}`);
    console.log(err);
    console.log("*** End of error ***");

    res.status(500).send(err.stack); // stack indicates where the error occurred.
  });

  // Usamos las rutas
  app.use("/book", bookRouter);
  app.use("/author", authorRouter);
  app.use("/public", express.static("public")); // use to upload vids and pics to :"Public" folder.
  app.use("/file-upload", fileUploadRouter); // use to create a function to allow upload of files.
  app.use("/", router);

  app.listen(PORT, () => {
    console.log(`app levantado en el puerto ${PORT}`);
  });
};

main();

/* TYPES OF MIDDLEWARE */

// Middleware for applications.
// Middleware for routes.
// Middleware for errors.

// TODOs:

/*
Añade un middleware a nivel de aplicación para hacer log de todas las peticiones que lleguen al API
Añade un middleware a nivel de rutas que te lea los parámetros de la paginación
Corrige ESLint para que funcione correctamente
Añade un middleware de aplicación que gestione todos los errores, recuerda que debes llamar a next(error) en aquellos sitios que suceda alguna excepción
Añade un servidor de estáticos para poder recuperar ficheros
Añade un endpoint para subir ficheros haciendo uso de Multer
Añade el campo profileImage a los autores y crea un endpoint para asociarles una imagen a los autores
*/
