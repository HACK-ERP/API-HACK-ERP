require("dotenv").config();
require("../Config/db.config");

console.log("Seeding suppliers...");

const mongoose = require("mongoose");
const Suppliers = require("../Models/Supplier.model");
const suppliers = require("./json/suppliers.json");

mongoose.connection.once("open", () => {
  mongoose.connection
    .dropCollection("suppliers")
    .then(() => {
      console.log("DB cleared");

      return Suppliers.create(suppliers);
    })
    .then((supplierDB) => {
      supplierDB.forEach((supplier) => {
        console.log(`${supplier.name} has been created`);
      });

      console.log(`${supplierDB.length} suppliers have been created`);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.disconnect();
    });
});
