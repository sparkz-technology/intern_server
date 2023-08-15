const Product = require('../models/product');

exports.getProducts = async (req, res) => {
  const ITEMS_PER_PAGE = 10;
  const page = +req.query.page || 1;

  try {
    const totalItems = await Product.countDocuments();
    const lastPage = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const products = await Product.find()
      .populate('userId')
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json({ products, currentPage: page, lastPage });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
