const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Author } = require("../models/Author.js");

const authorList = [
  { email: "ggmarquez@gmail.com", password: "12345678", name: "Gabriel García Márquez", country: "Colombia" },
  { email: "jausten@gmail.com", password: "ja123456", name: "Jane Austen", country: "England" },
  { email: "ltolstoy@gmail.com", password: "lt123456", name: "Leo Tolstoy", country: "Russia" },
  { email: "vwolf@gmail.com", password: "vw123456", name: "Virginia Woolf", country: "England" },
  { email: "ehemingway@gmail.com", password: "eh123456", name: "Ernest Hemingway", country: "USA" },
  { email: "JLB@gmail.com", password: "jlb123456", name: "Jorge Luis Borges", country: "Argentina" },
  { email: "FranzK@gmail.com", password: "fk123456", name: "Franz Kafka", country: "Czechoslovakia" },
  { email: "TMorrison@gmail.com", password: "tm123456", name: "Toni Morrison", country: "USA" },
  { email: "HMurakami@gmail.com", password: "hm123456", name: "Haruki Murakami", country: "Japan" },
  { email: "CAchebe@gmail.com", password: "ca123456", name: "Chinua Achebe", country: "Nigeria" },
];

const authorSeed = async () => {
  try {
    await connect();
    console.log("Tenemos conexión");

    // Borrar datos
    await Author.collection.drop();
    console.log("Authors eliminados");

    // Añadimos usuarios
    const documents = authorList.map((author) => new Author(author));
    // await
    Author.insertMany(documents);
    console.log("Authors creados correctamente!");
  } catch (error) {
    console.error("ERROR AL CONECTAR CON LA BBDD");
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

authorSeed();
