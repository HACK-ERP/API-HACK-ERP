//suppliers routes

const router = require('express').Router();
const suppliersController = require('../Controllers/suppliers.controller');

//create
router.post('/suppliers', suppliersController.create);
//list
router.get('/suppliers', suppliersController.list);
//getOne
router.get('/suppliers/:id', suppliersController.getOne);
//update
router.put('/suppliers/:id', suppliersController.update);

module.exports = router;
