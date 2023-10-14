//ruta de usuarios

const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/auth.middleware');
const usersController = require('../Controllers/users.controller');
const authController = require('../Controllers/auth.controller');
const upload = require('../Config/cloudinary.config');

//users
router.post('/users/create', usersController.create);
router.get('/users/list', usersController.list);
router.get('/user/current',authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get('/user/:id', usersController.getOne);

//auth
router.post('/user/login-mail', authController.loginMail);
router.post('/user/login-phone', authController.loginPhone);

//activate
router.get('/users/:id/activate', usersController.activate);


module.exports = router;

