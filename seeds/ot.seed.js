require("dotenv").config();
require("../Config/db.config");

console.log("Seeding products...");

const mongoose = require("mongoose");
const OT = require("../Models/oT.model");
const ot = require("./json/oTs.json");

mongoose.connection.once("open", () => {
  mongoose.connection
    .dropCollection("OT") // Cambia "ots" a "OT" para que coincida con el nombre de la colección
    .then(() => {
      console.log("DB cleared");

      return OT.create(ot);
    })
    .then((otDB) => {
      otDB.forEach((ot) => {
        console.log(`${ot.code} has been created`); // Cambia "name" a "code"
      });

      console.log(`${otDB.length} ots have been created`);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.disconnect();
    });
});
