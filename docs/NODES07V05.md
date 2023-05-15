# VIDEO 05 - Configurando CORS con librería

Para no tener que añadir estas cabeceras de manera manual, existe una librería que nos permite configurarlo de manera fácil:

<https://www.npmjs.com/package/cors>

Para usarlo solo tenemos que instalar la librería:

```jsx
npm i cors
```

Después en nuestro index.js, solo debemos importar la librería:

```jsx
const cors = require("cors");
```

E indicar a express que lo use:

```jsx
server.use(
  cors({
    origin: "http://localhost:3000",
  })
);
```

Finalmente nuestro fichero index.js queda de la siguiente manera:

```jsx
const express = require("express");
const { userRouter } = require("./routes/user.routes.js");
const { carRouter } = require("./routes/car.routes.js");
const { brandRouter } = require("./routes/brand.routes.js");
const cors = require("cors");

const main = async () => {
  // Conexión a la BBDD
  const { connect } = require("./db.js");
  const database = await connect();

  // Configuración del server
  const PORT = 3000;
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

  // Rutas
  const router = express.Router();
  router.get("/", (req, res) => {
    res.send(`Esta es la home de nuestra API. Estamos utilizando la BBDD de ${database.connection.name} `);
  });
  router.get("*", (req, res) => {
    res.status(404).send("Lo sentimos :( No hemos encontrado la página solicitada.");
  });

  // Usamos las rutas
  server.use("/user", userRouter);
  server.use("/car", carRouter);
  server.use("/brand", brandRouter);
  server.use("/", router);

  server.listen(PORT, () => {
    console.log(`Server levantado en el puerto ${PORT}`);
  });
};

main();
```

Recuerda que puedes encontrar todo el contenido que hemos visto en los vídeos, en el siguiente repositorio:

<https://github.com/The-Valley-School/node-s7-validation-and-cors>
