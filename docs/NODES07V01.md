# VIDEO 01 - Mejoras en conexión a mongo

En este vídeo hemos mejorado nuestro script de conexión a la base de datos, para que si pierde la conexión o no consigue realizarla a la primera, lo vuelva a intentar pasados 5 segundos. Esto hará que nuestra base de datos sea más estable y resista mejor a los fallos.

En código de nuestro fichero db.js ha quedado así:

```jsx
// Cargamos variables de entorno
require("dotenv").config();
const DB_CONNECTION = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

// Importamos librerías
const mongoose = require("mongoose");

// Configuración de la conexión a Mongo
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  dbName: DB_NAME,
};

const connect = async () => {
  try {
    const database = await mongoose.connect(DB_CONNECTION, config);
    const name = database.connection.name;
    const host = database.connection.host;
    console.log(`Conectado a la base de datos ${name} en el host ${host}`);
    return database;
  } catch (error) {
    console.error(error);
    console.log("Error en la conexión, intentando conectar en 5s...");
    setTimeout(connect, 5000);
  }
};

module.exports = { connect };
```
