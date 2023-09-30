const router = require('express').Router();
const productsController = require('../Controllers/products.controller');
//const upload = require('../Config/cloudinary.config');

// misc
router.get('/', (req, res, next) => {
    res.json({ message: 'Welcome to the API' });
  });

// products
router.post('/products/create', productsController.create);
router.get('/products', productsController.list);
router.get('/products/:id', productsController.detail);
router.delete('/products/:id', productsController.delete);
router.put('/products/:id/edit', productsController.update);

module.exports = router;
