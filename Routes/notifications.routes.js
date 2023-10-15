//notifications Routes
const router = require('express').Router();
const notificationsController = require('../Controllers/notifications.controller');

router.post('/notification/create', notificationsController.create);
router.get('/notification/list', notificationsController.list);
router.patch('/notification/:id', notificationsController.update);

module.exports = router;