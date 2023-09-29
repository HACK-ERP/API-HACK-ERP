require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const cors = require('cors');

//db config
require('./Config/db.config');



//crear el servidor
const app = express();
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
}));

//configurar el servidor
app.use(logger('dev'));
app.use(express.json());

//rutas

app.get('/', (req, res) => { res.send('Hello World') }) // Ruta de prueba);

const authRoutes = require('./Routes/users.routes');
app.use('/hackerp', authRoutes);

const routes = require('./Routes/products.routes');
app.use('/hackerp', routes);
const rowMaterialsRoutes = require('./Routes/rowMaterials.routes');
app.use('/hackerp', rowMaterialsRoutes);
const suppliersRoutes = require('./Routes/suppliers.routes');
app.use('/hackerp', suppliersRoutes);

//Middleware general de errores
app.use((req, res, next) => {
    next(createError(StatusCodes.NOT_FOUND, 'Route not found'))
  })
  
  // Middleware genérico de errores
  app.use((error, req, res, next) => {
    console.error(error);
  
    if (error instanceof mongoose.Error.ValidationError) {
      error = createError(StatusCodes.BAD_REQUEST, error)
    } else if (error instanceof mongoose.Error.CastError) {
      error = createError(StatusCodes.BAD_REQUEST, 'Resource not found')
    } else if (error.message.includes('E11000')) {
      error = createError(StatusCodes.BAD_REQUEST, 'Resource already exists')
    } else if (error instanceof jwt.JsonWebTokenError) {
      error = createError(StatusCodes.UNAUTHORIZED, error)
    } else if (!error.status) {
      error = createError(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  
    const data = {};
  
    data.message = error.message;
    data.errors = error.errors
      ? Object.keys(error.errors).reduce(
        (errors, key) => {
          return {
            ...errors,
            [key]: error.errors[key].message || error.errors[key]
          }
        },
        {}
      ) : undefined
  
    res.status(error.status).json(data)
  })
//listen

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});




