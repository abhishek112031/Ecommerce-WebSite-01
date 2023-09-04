const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv').config();
const bcrypt=require('bcrypt');
const connectionURI = 'mongodb://0.0.0.0:27017/ecommerceWebSite-01';

//models:
const User = require('./models/user');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//auth/validation functions:
const inAppropiateInputs=require('./auth-validation-encript-decript/inAppropiateInputs');
const passwordValidator=require('./auth-validation-encript-decript/passwordValidator');




//main middlewares:
app.get('/sign-up', (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'html', 'index.html'))
})

app.post('/sign-up', async (req, res, next) => {
    try {
        const { fname, lname, email, password } = req.body;
        // console.log(fname, lname, email, password)
        if(inAppropiateInputs(fname)||inAppropiateInputs(lname)||inAppropiateInputs(email)||inAppropiateInputs(password)){
            //  return res.status(400).json({message:'cnt be empty!'})
            throw new Error('input fields can\'t be empty !');


        }
        else if(!passwordValidator(password)){
            throw new Error('Password should be at least 8 characters long & it must be contained: 1 special char,one uppercase char');

        }
        else{
            const alreadyUser=await User.findOne({email:email});

            if(alreadyUser){
             throw new Error('User already exist!');
            }
            else{
                bcrypt.hash(password,10,async(error,hash)=>{

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

})



mongoose.connect(connectionURI)
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`app is running on port: ${process.env.PORT}`)
        })

    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
