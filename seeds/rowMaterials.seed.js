require("dotenv").config();
require("../Config/db.config");

console.log("Seeding Row Material...");

const mongoose = require("mongoose");
const RowMaterial = require("../Models/RowMaterial.model");
const rowMaterialData = require("./json/rowMaterials.json");

mongoose.connection.once("open", () => {
  mongoose.connection.db.dropCollection("rowmaterials")
    .then(() => {
      console.log("DB cleared");

      return RowMaterial.create(rowMaterialData);
    })
    .then((createdRowMaterials) => {
      createdRowMaterials.forEach((rowMaterial) => {
        console.log(`${rowMaterial.name} has been created`);
      });

      console.log(`${createdRowMaterials.length} rowMaterials have been created`);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.disconnect();
    });
});
