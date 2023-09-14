const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectionURI = 'mongodb://0.0.0.0:27017/ecommerceWebSite-01';

//routes:
const userRoutes=require('./routes/user')

const app = express();

//common middlewares:
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())


//main middlewares:
app.use(userRoutes);



mongoose.connect(connectionURI)
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`app is running on port: ${process.env.PORT}`)
        })

    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
