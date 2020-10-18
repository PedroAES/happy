const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require("cors");

require('express-async-errors');


class App {
  constructor() {
    this.express = express();

    this.express.use(cors());
    this.database();
    this.middlewares();
    this.routes();
    this.express.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
    this.express.listen(3001, () =>
      console.log(`API running on port 3001 `)
    );
  }

  database() {
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect("mongodb://localhost:27017/nlw", { useNewUrlParser: true });
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./routes"));
  }
}
module.exports = new App().express;