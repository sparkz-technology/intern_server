const { validationResult } = require('express-validator');

const Product = require('../models/product');
const User = require('../models/user');

exports.getProducts = async (req, res, next) => {
  const ITEMS_PER_PAGE = 10;
  const page = +req.query.page || 1;
  try {
    const totalItems = await Product.find({
      userId: req.userId,
    }).countDocuments();
    const lastPage = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const products = await Product.find({
      userId: req.userId,
    })
      .populate('userId')
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }
    if (!products) {
      return res.status(404).json({ message: 'No products found' });
    }
    res.status(200).json({ products, currentPage: page, lastPage });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.postAddProduct = async (req, res, next) => {
  const { title, content, price } = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error('validation failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const product = new Product({
      title,
      content,
      price,
      userId: req.userId,
      creater,
    });
    await product.save();
    const user = await User.findById(req.userId);
    user.products.push(product);
    await user.save();
    res.status(201).json({
      message: 'product created',
      product,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    if (!req.params.productId) {
      const error = new Error('No product id found');
      error.statusCode = 422;
      throw error;
    }
    if (!req.userId) {
      const error = new Error('Not authenticated');
      error.statusCode = 401;
      throw error;
    }
    await User.findByIdAndUpdate(req.userId, {
      $pull: { products: req.params.id },
    });

    await Product.findByIdAndRemove(req.params.productId);
    res.status(200).json({ message: 'product deleted' });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
