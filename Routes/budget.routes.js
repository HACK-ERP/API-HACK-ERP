//budget routes

const express = require('express');
const router = express.Router();
const budgetController = require('../Controllers/budget.controller');


router.post('/budget/create', budgetController.create);
router.get('/budget/list', budgetController.list);
router.get('/budget/:id', budgetController.detail);
router.patch('/budget/:id', budgetController.update);
router.delete('/budget/:id', budgetController.delete);

module.exports = router;
