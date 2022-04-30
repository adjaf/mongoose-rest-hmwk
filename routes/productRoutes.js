const router = require('express').Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/oscarEndpoint', productController.oscarEndpoint);
router.get('/:id', productController.findProduct);
router.post('/', productController.createProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;