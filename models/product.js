const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    price: { type: Number, required: true },
    creater: { type: String, required: true },
  },
  { timestamps: true },
);
// Define a virtual property to get the user's name associated with the product
productSchema.virtual('userName', {
  ref: 'User', // The model to use for the reference
  localField: 'userId', // The field in the current model
  foreignField: '_id', // The field in the referenced model
  justOne: true, // Set to true since each product has one user
  // 'userName' will be populated with the name of the user
});

module.exports = mongoose.model('Product', productSchema);
