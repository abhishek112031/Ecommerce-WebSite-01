const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  // Other product properties
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
