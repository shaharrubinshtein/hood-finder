const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const hoodRoutes = require('./routes/hoodRoutes');




const port = 3000

const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

//loading environment variables from .env file
const connectionString = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.qowpxfo.mongodb.net/${DB_NAME}`;

// connecting to MongoDB
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');


        const app = express()


        //routes should be  here

        app.use('/neighborhoods', hoodRoutes);

        app.all('*', (req, res) => {
            res.send('not found');
        })

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });