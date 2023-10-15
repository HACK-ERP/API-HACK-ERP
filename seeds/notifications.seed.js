require("dotenv").config();
require("../Config/db.config");

console.log("Seeding notifications...");

const mongoose = require("mongoose");
const Notification = require("../Models/Notifications.model");
const notifications = require("./json/notifications.json");

mongoose.connection.once("open", async () => {
  try {
    await Notification.deleteMany({}); // Elimina todos los documentos de la colección
    console.log("DB cleared");

    const notificationsDB = await Notification.create(notifications);

    notificationsDB.forEach((notification) => {
      console.log(`${notification.sender} has been created`);
    });

    console.log(`${notificationsDB.length} notifications have been created`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.disconnect();
  }
});
