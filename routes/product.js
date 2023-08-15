const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const isAuth = require('../middleware/is-auth');

router.get('/getproducts', isAuth, productController.getProducts);
module.exports = router;
