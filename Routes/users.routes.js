//ruta de usuarios

const express = require('express');
const router = express.Router();


const usersController = require('../Controllers/users.controller');

router.post('/user/create', usersController.create);
router.get('/users/list', usersController.list);


module.exports = router;