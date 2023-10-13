//ruta de usuarios

const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/auth.middleware');
const usersController = require('../Controllers/users.controller');
const authController = require('../Controllers/auth.controller');
const upload = require('../Config/cloudinary.config');

//users
router.post('/user/create', usersController.create);
router.get('/users/list', usersController.list);
// router.get('/user/:id', usersController.getOne);
router.get('/user/current',authMiddleware.isAuthenticated, usersController.getCurrentUser);

//auth
router.post('/user/login-mail', authController.loginMail);
router.post('/user/login-phone', authController.loginPhone);


module.exports = router;

