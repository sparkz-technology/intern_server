const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

router.get('/products', isAuth, adminController.getProducts);

router.post(
  '/add-product',
  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim()
      .withMessage('Title must be at least 3 characters long.'),
    body('content')
      .isLength({ min: 5, max: 400 })
      .trim()
      .withMessage('Content must be at least 5 characters long.'),
    body('price').isInt().withMessage('Price must be a number.'),
  ],
  isAuth,
  adminController.postAddProduct,
);
router.delete('/product/:productId', isAuth, adminController.deleteProduct);

module.exports = router;
