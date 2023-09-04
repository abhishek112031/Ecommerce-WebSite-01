const mongoose = require('mongoose');

// Define a custom validator function for the password field


const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password:String
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
