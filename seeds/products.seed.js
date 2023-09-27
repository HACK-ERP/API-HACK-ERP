require("dotenv").config();
require("../Config/db.config");

console.log("Seeding products...");

const mongoose = require("mongoose");
const Products = require("../Models/Product.model");
const products = require("./json/products.json");

mongoose.connection.once("open", () => {
  mongoose.connection
    .dropCollection("products")
    .then(() => {
      console.log("DB cleared");

      return Products.create(products);
    })
    .then((productDB) => {
      productDB.forEach((product) => {
        console.log(`${product.name} has been created`);
      });

      console.log(`${productDB.length} products have been created`);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.disconnect();
    });
});
