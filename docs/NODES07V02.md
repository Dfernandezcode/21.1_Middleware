# VIDEO 02 - Validaciones para string

En este vídeo hemos visto algunas validaciones y funcionalidades de los Strings en mongoose.

En concreto hemos visto:

- La función trim que nos permite quitar los espacios en blanco por delante y por detrás de nuestros textos
- El validador minLength y maxLength que nos permite indicar una longitud máxima o mínima para los textos
- El validador enum que obliga a que el texto sea uno de los contenidos en el array que le indiquemos
- La función uppercase que hará que todos los textos sean convertidos a mayúsculas antes de ser guardados en base de datos.

Tras ver estas funcionalidades nuestro fichero Brand.js ha quedado así:

```jsx
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const allowedCountries = ["SPAIN", "ITALY", "USA", "GERMANY", "JAPAN"];

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
      trim: true,
    },
    creationYear: {
      type: Number,
      required: false,
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
