const mongoose = require('mongoose');

const DB_NAME = 'HACK-ERP';
// const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const URI =  'mongodb://127.0.0.1:27017';
const DB_URI = `${URI}/${DB_NAME}`;

// Conexion a la BBDD
mongoose.connect(DB_URI)
  .then(() => console.info(`Successfully connected to the database ${DB_URI}`))
  .catch((error) => {
    console.error(`An error ocurred trying to connect to de database ${DB_URI}`, error);
    process.exit(0);
  })

// Cierre de la conexión

process.on('SIGINT', () => {
  mongoose.connection.close()
    .then(function () {
      console.log('Mongoose disconnected on app termination');
      process.exit(0);
    })
});