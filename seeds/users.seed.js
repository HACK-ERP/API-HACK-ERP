require("dotenv").config();
require("../Config/db.config");

console.log("Seeding users...")

const mongoose = require("mongoose");
const Users = require("../Models/User.model");
const users = require("./json/users.json");

mongoose.connection.once("open", () => {
  mongoose.connection
    .dropCollection("users")
    .then(() => {
      console.log("DB cleared");

      return Users.create(users);
    })
    .then((userDB) => {
        userDB.forEach((user) => {
        console.log(`${user.name} has been created`);
      });

      console.log(`${userDB.length} users have been created`);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.disconnect();
    });
});