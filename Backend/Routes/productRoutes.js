// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productControllers');

router.post('/products', productController.insertProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
