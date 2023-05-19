const bcrypt = require("bcrypt");
const { Author } = require("../models/Author");

const isAuth = async (req, res, next) => {
  try {
    const { email, password } = req.headers;

    if (!email || !password) {
      return res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
    }

    const author = await Author.findOne({ email }).select("+password");
    if (!author) {
      return res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
    }

    const match = await bcrypt.compare(password, author.password);
    if (!match) {
      return res.status(401).json({ error: "No tienes autorización para realizar esta operación" });
    }

    req.author = author;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isAuth };
