# VIDEO 03 - Validaciones para number y normalización de datos

En este vídeo hemos visto algunas funcionalidades y validaciones que podemos aplicar en mongoose, en concreto:

- min y max que nos permite indicar un valor máximo o mínimo en nuestros datos de tipo numérico
- mensajes de error personalizados que podemos indicar para devolver al usuario cuando la validación no se cumpla

Tras añadir estas validaciones, nuestro fichero Brand.js ha quedado así:

```jsx
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const allowedCountries = ["SPAIN", "ITALY", "USA", "GERMANY", "JAPAN", "FRANCE"];
const currentYear = new Date().getFullYear();

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "Hijo mío... dame algo más de detalle, al menos 3 letras para el nombre"],
      maxLength: 20,
      trim: true,
    },
    creationYear: {
      type: Number,
      required: false,
      min: [1803, "No mientas porque la marca de coches más antigua es Peugeot y se creó en 1803"],
      max: currentYear,
    },
    country: {
      type: String,
      required: false,
      enum: allowedCountries,
      uppercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);
module.exports = { Brand };
```

Además de esto, hemos creado un script que recorra todas las marcas de nuestra base de datos, realizando una “normalización” para que todos los datos cumplan con las nuevas restricciones.

Este es el fichero brand.normalization.js que hemos creado:

```jsx
const { mongoose } = require("mongoose");
const { connect } = require("../db.js");
const { Brand } = require("../models/Brand.js");

const brandNormalization = async () => {
  try {
    await connect();
    console.log("Conexíón realizada correctamente.");

    const brands = await Brand.find();
    console.log(`Hemos recuperado ${brands.length} marcas de la base de datos`);

    // Actualizamos los campos según las reglas de negocio que queramos
    // Podríamos incluso eliminar datos que no sean correctos
    for (let i = 0; i < brands.length; i++) {
      const brand = brands[i];
      brand.country = brand.country.toUpperCase();
      await brand.save();

      console.log(`Modificada marca ${brand.name}`);
    }

    console.log("Modificadas todas las marcas de nuestra base de datos");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

brandNormalization();
```
