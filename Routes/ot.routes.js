//routes OT

const express = require('express');
const router = express.Router();
const otController = require('../Controllers/ot.controller');

router.post('/ot/create', otController.create);
router.get('/ot/list', otController.list);
router.get('/ot/:id', otController.getOne);
router.put('/ot/:id', otController.statusUpdate);

module.exports = router;

