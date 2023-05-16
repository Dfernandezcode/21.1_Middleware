const express = require("express");
const { bookRouter } = require("./routes/book.routes.js");
const { authorRouter } = require("./routes/author.routes.js");
const { connect } = require("./db.js");
const cors = require("cors");

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
    console.log("Me han pedido libros!!");
    next();
  });

  // Usamos las rutas
  app.use("/book", bookRouter);
  app.use("/author", authorRouter);
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
