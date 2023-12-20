const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs');

const neighborhoodSchema = require('../../hood-finder/Backend/models/neigborhoodSchema')

const app = express()
const port = 3001


//load json file into mongo db - only once! 
// let neighborhoodData = fs.readFileSync('./db/neighborhoods_data.json');
// let neighborhoods = JSON.parse(neighborhoodData)
// neighborhoodSchema.insertMany(neighborhoods)

app.get('/', (req, res) => {
    res.send('Hello World!')
})


// app.get('/neighborhood', async (req, res) => {
//     try {
//         const neighborhoods = await neighborhoodSchema.find({});
//         if (neighborhoods) {
//             res.json(neighborhoods);
//         }
//         else 
//             res.status(404).send('not found')
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });






try {
    mongoose.connect('mongodb+srv://hoodDb:vUes935fjPZemsK7@cluster0.qowpxfo.mongodb.net/')
    console.log('Connected to MongoDB');
}
catch (error) {
    handleError(error)
}


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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



//vUes935fjPZemsK7