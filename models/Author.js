const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator"); // npm i validator
const bcrypt = require("bcrypt"); // npm i bcrypt

const allowedCountries = ["SPAIN", "ITALY", "USA", "GERMANY", "JAPAN", "FRANCE", "ENGLAND", "COLOMBIA", "RUSSIA", "ARGENTINA", "CZECHOSLOVAKIA", "NIGERIA"];

// Creamos el schema del author
const authorSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: {
        // allows for a validation of a field.
        validator: validator.isEmail,
        message: "Email incorrecto",
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minLength: [8, "La contraseña debe tener al menos 8 caracteres"],
      select: false,
    },
    name: {
      type: String,
      required: true,
      minLength: [3, "Dame algo más de detalle, al menos 3 letras para el nombre."],
      maxLength: [25, "Tampoco te pases... intenta resumir un poco el nombre, máximo 25 letras."],
      trim: true,
    },
    country: {
      type: String,
      required: true,
      enum: allowedCountries,
      uppercase: true,
      trim: true,
    },
    profileImage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// encrypt routes directly from models
authorSchema.pre("save", async function (next) {
  try {
    // Si la contraseña ya estaba encriptada, no la encriptamos de nuevo
    // if (this.isModified("password")) {
    // when using arrow functions change to normal async function.
    const saltRounds = 10;
    const passwordEncrypted = await bcrypt.hash(this.password, saltRounds);
    this.password = passwordEncrypted;
    // }

    next();
  } catch (error) {
    next(error);
  }
});

const Author = mongoose.model("Author", authorSchema);
module.exports = { Author };
