//Rutas de requiredMaterials que tienen que ver con OT y tiene el controlador de requiredMaterials.controller.js

const router = require('express').Router();
const requiredMaterialsController = require('../Controllers/requiredMaterials.controller');

router.get('/requiredMaterials/ot/:otId', requiredMaterialsController.getRequiredMaterials);


module.exports = router;
