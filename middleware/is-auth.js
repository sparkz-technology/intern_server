require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //split the token and get the second part
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId }; //add new field to the request
    req.userId = decodedToken.userId; //add new field to the request
    await User.findOne({ _id: req.userId }).then((user) => {
      if (!user) {
        throw error;
      }
      creater = user.name;
    });

    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: 'You are not authenticated!', error: error });
  }
};
