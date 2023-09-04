const mongoose = require('mongoose');

// Define a custom validator function for the password field
const passwordValidator = function (value) {
  // Password should be at least 8 characters long
  if (value.length < 8) {
    return false;
  }

  // Use regular expressions to check for special character, uppercase, and number
  const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  const regexUpperCase = /[A-Z]/;
  const regexNumber = /[0-9]/;

  return (
    regexSpecialChar.test(value) &&
    regexUpperCase.test(value) &&
    regexNumber.test(value)
  );
};

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: {
    type: String,
    validate: {
      validator: passwordValidator,
      message:
        'Password must be at least 8 characters long and contain at least one special character, one uppercase letter, and one number.',
    },
  },
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
