const express = require('express');
const router = express.Router();
const clientController = require('../Controllers/clients.controller');

router.post('/client/create', clientController.create);
router.get('/client/list', clientController.list);
router.get('/client/:id', clientController.get);
router.patch('/client/:id', clientController.update);
router.delete('/client/:id', clientController.delete);

module.exports = router;
