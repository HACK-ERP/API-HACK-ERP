//suppliers routes

const router = require('express').Router();
const suppliersController = require('../Controllers/suppliers.controller');

//create
router.post('/suppliers/create', suppliersController.create);
//list
router.get('/suppliers/list', suppliersController.list);
//getOne
router.get('/suppliers/:id', suppliersController.getOne);
//update
router.put('/suppliers/:id/edit', suppliersController.update);
//delete
router.delete('/suppliers/:id', suppliersController.delete);

module.exports = router;
