const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const neighborhoodSchema = require('./Models/neigborhoodSchema')
//const fs = require('fs');


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

        app.get('/', (req, res) => {
            res.send('Hello World!')
        })

        //routes should be  here


        //get all neighborhoods
        app.get('/neighborhood', async (req, res) => {
            try {
                const neighborhoods = await neighborhoodSchema.find({});
                if (neighborhoods) {
                    res.json(neighborhoods);
                }
                else
                    res.status(404).send('not found')
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });


        // Endpoint to fetch neighborhoods with filtering and sorting options
        app.get('/neighborhood/:ageRange', async (req, res) => {
            try {
                let query = {};
                // Filtering by age range
                if (req.query.ageRange && Array.isArray(req.query.ageRange) && req.query.ageRange.length === 2) {
                    const [minAge, maxAge] = req.query.ageRange.map(Number);
                    query.averageAge = { $gte: minAge, $lte: maxAge };
                }

                //   // Filtering by maximum distance
                //   if (req.query.maxDistance) {
                //     const maxDistance = parseFloat(req.query.maxDistance);
                //     query.distance = { $lte: maxDistance };
                //   }

                //   // Sorting
                //   let sortQuery = {};
                //   if (req.query.sortBy && Array.isArray(req.query.sortBy) && req.query.sortBy.length === 2) {
                //     const [sortField, sortOrder] = req.query.sortBy;
                //     sortQuery[sortField] = sortOrder === 'asc' ? 1 : -1;
                //   }
                console.log("query-->", query);
                const neighborhoods = await neighborhoodSchema.find(query).sort(sortQuery);
                res.json({ neighborhoods });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });



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




//load json file into mongo db - only once! 
// let neighborhoodData = fs.readFileSync('./db/neighborhoods_data.json');
// let neighborhoods = JSON.parse(neighborhoodData)
// neighborhoodSchema.insertMany(neighborhoods)
