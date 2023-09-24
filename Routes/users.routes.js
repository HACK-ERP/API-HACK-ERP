//ruta de usuarios

const express = require('express');
const router = express.Router();


const usersController = require('../Controllers/users.controller');
const authController = require('../Controllers/auth.controller');


//users
router.post('/user/create', usersController.create);
router.get('/users/list', usersController.list);

//auth
router.post('/user/login', authController.login);


module.exports = router;

