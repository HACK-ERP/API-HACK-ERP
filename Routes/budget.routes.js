//budget routes

const express = require('express');
const router = express.Router();
const budgetController = require('../Controllers/budget.controller');


router.post('/budget/create', budgetController.create);
router.get('/budget/list', budgetController.list);
router.get('/budget/:id', budgetController.detail);
console.log('budget.routes.js');
router.patch('/budget/status/:id', budgetController.statusUpdate);
router.put('/budget/:id', budgetController.update);
router.delete('/budget/:id', budgetController.delete);

module.exports = router;
