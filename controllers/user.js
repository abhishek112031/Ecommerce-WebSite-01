const path=require('path');

const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

//auth/validation functions:
const inAppropiateInputs = require('../auth-validation-encript-decript/inAppropiateInputs');
const passwordValidator = require('../auth-validation-encript-decript/passwordValidator');
const generateToken = require('../auth-validation-encript-decript/generateToken');


const User = require('../models/user');

exports.getSignupUserPage=async(req,res,next)=>{
    res.status(200).sendFile(path.join(__dirname, '..','public', 'html', 'index.html'));
}

exports.postSignupUser=async(req,res,next)=>{
    try {
        const { fname, lname, email, password } = req.body;
       
        if (inAppropiateInputs(fname) || inAppropiateInputs(lname) || inAppropiateInputs(email) || inAppropiateInputs(password)) {
            //  return res.status(400).json({message:'cnt be empty!'})
            throw new Error('input fields can\'t be empty !');


        }
        else if (!passwordValidator(password)) {
            throw new Error('Password should be at least 8 characters long & it must be contained: 1 special char,one uppercase char');

        }
        else {
            const alreadyUser = await User.findOne({ email: email });

            if (alreadyUser) {
                throw new Error('User already exist!');
            }
            else {
                bcrypt.hash(password, 10, async (error, hash) => {

                    const newUser = await User.create({
                        firstname: fname,
                        lastname: lname,
                        email: email,
                        password: hash
                    })

                    res.status(201).json({ message: 'Registered Successfully !', user: newUser })
                })
            }

        }

    }

    catch (err) {
        // console.log('err==>', err)
        res.status(500).json({ message: err.message });
    }
    

}

exports.postLogIn=async(req,res,next)=>{
    try {

        const { email, password } = req.body;

        if (inAppropiateInputs(email) || inAppropiateInputs(password)) {
            throw new Error('input fields can\'t be empty !');
        }
        else {
            let user = await User.findOne({ email: email });
            if (!user) {
                throw new Error('EmailId does\'t exist !!');

            }
            else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        console.log(err)
                        throw new Error('Incorrect Password!');

                    }
                    else if (result === true) {
                        const token = generateToken(user._id, user.firstname);
                        // console.log('==>', token)
                        res.cookie('cookietoken', token, { httpOnly: true });
                        res.status(200).json({ message: 'loggedIn successful !!!' });


                    }
                    else {
                        // console.log('hiii')
                        // throw new Error('Incorrect Password!');
                        res.status(500).json({ message: 'Incorrect Password!' })

                    }
                })
            }
        }
    }
    catch (err) {
        // console.log(err)
        res.status(500).json({ message: err.message })
    }



}

exports.userDashBoard=async(req,res,next)=>{
    res.status(200).json({ mesage: 'success', user: req.user })

}

// app.get('/logout', (req, res) => {
//     // Clear the "mytoken" cookie
//     res.clearCookie('mytoken');

//     // Optionally, you can redirect the user to a different page after logout
//     res.redirect('/login'); // Redirect to the login page, for example
// });
