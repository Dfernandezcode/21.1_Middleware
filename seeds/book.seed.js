const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Book } = require("../models/Book.js");
const { faker } = require("@faker-js/faker");

const bookList = [
  { title: "Harry Potter", pages: 543 },
  { title: "1984", pages: 328 },
  { title: "To Kill a Mockingbird", pages: 281 },
  { title: "The Great Gatsby", pages: 180 },
  { title: "Pride and Prejudice", pages: 279 },
];

// Creamos libros adicionales
for (let i = 0; i < 50; i++) {
  const newBook = {
    title: faker.lorem.words(4),
    pages: faker.datatype.number({ min: 200, max: 700 }),
  };
  bookList.push(newBook);
}

const bookWithPublisher = {
  title: "El guardían entre el centeno",
  pages: 231,
  publisher: {
    name: "Alianza",
    country: "Spain",
  },
};

bookList.push(bookWithPublisher);

const bookSeed = async () => {
  try {
    const database = await connect();
    console.log("Tenemos conexión: " + database.connection.name);

    // Borrar datos
    await Book.collection.drop();
    console.log("Libros eliminados");

    // Añadimos libros
    const documents = bookList.map((book) => new Book(book));
    await Book.insertMany(documents);
    console.log("Libros creados correctamente!");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

bookSeed();
