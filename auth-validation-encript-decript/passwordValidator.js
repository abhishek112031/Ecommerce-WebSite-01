function passwordValidator (value) {
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
module.exports=passwordValidator