require("dotenv").config();
require("../Config/db.config");

console.log("Seeding budgets...");

const mongoose = require("mongoose");
const Budget = require("../Models/Budget.model");
const budgets = require("./json/budgets.json");

mongoose.connection.once("open", () => {
  mongoose.connection
    .dropCollection("budgets")
    .then(() => {
      console.log("DB cleared");

      return Budget.create(budgets);
    })
    .then((budgetsDB) => {
      budgetsDB.forEach((budget) => {
        console.log(`${budget.budgetNumber} has been created`);
      });

      console.log(`${budgetsDB.length} budgets have been created`);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.disconnect();
    });
});
