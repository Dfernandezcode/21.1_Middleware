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
