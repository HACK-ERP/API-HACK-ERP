require("dotenv").config();
require("../Config/db.config");

console.log("Seeding clients...");

const mongoose = require("mongoose");
const Client = require("../Models/Clients.model");
const clients = require("./json/clients.json");

mongoose.connection.once("open", () => {
    mongoose.connection
        .dropCollection("clients")
        .then(() => {
        console.log("DB cleared");
    
        return Client.create(clients);
        })
        .then((clientsDB) => {
        clientsDB.forEach((client) => {
            console.log(`${client.RS} has been created`);
        });
    
        console.log(`${clientsDB.length} clients have been created`);
        })
        .catch((err) => console.error(err))
        .finally(() => {
        mongoose.disconnect();
        });
    });
