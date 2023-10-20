//RowMaterial routes

const router = require('express').Router();
const upload = require('../Config/cloudinary.config');
const rowMaterialController = require('../Controllers/rowMaterials.controller');
const authMiddleware = require('../Middlewares/auth.middleware');


//create
router.post('/rowMaterial/create', upload.single('image'), rowMaterialController.create);
//list
router.get('/rowMaterials/list', upload.single('image') , rowMaterialController.list);
//getOne
router.get('/rowMaterial/:id', rowMaterialController.getOne);
//update
router.put('/rowMaterial/:id/edit', upload.single('image'), rowMaterialController.update);
//stock update
router.patch('/rowMaterial/:id/stock', rowMaterialController.PurchaseMaterials);
//discount stock
router.patch('/rowMaterial/:id/discount', rowMaterialController.discountStock);


module.exports = router;


