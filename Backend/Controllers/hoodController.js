const Neighborhood = require('../Models/neigborhoodSchema');

//const fs = require('fs');

//load json file into mongo db - only once! 
// let neighborhoodData = fs.readFileSync('./db/neighborhoods_data.json');
// console.log(neighborhoodData);
// let neighborhoods = JSON.parse(neighborhoodData)
// Neighborhood.insertMany(neighborhoods)


//get all neighborhoods
exports.getAllNeighborhoods = async (req, res) => {
  try {
    const neighborhoods = await Neighborhood.find({});
    if (neighborhoods) {
        console.log("here get all-->", neighborhoods);
        res.json({neighborhoods});
    }
    else
        res.status(404).send('not found')
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};











// Endpoint to fetch neighborhoods with filtering and sorting options
// exports.getByAgeRange = async (req, res) => {
//     try {
//         let query = {};
//         // Filtering by age range
//         if (req.query.ageRange && Array.isArray(req.query.ageRange) && req.query.ageRange.length === 2) {
//             const [minAge, maxAge] = req.query.ageRange.map(Number);
//             query.averageAge = { $gte: minAge, $lte: maxAge };
//         }

//         //   // Filtering by maximum distance
//         //   if (req.query.maxDistance) {
//         //     const maxDistance = parseFloat(req.query.maxDistance);
//         //     query.distance = { $lte: maxDistance };
//         //   }

//         //   // Sorting
//         //   let sortQuery = {};
//         //   if (req.query.sortBy && Array.isArray(req.query.sortBy) && req.query.sortBy.length === 2) {
//         //     const [sortField, sortOrder] = req.query.sortBy;
//         //     sortQuery[sortField] = sortOrder === 'asc' ? 1 : -1;
//         //   }
//         const neighborhoods = await neighborhoodSchema.find(query).sort(sortQuery);
//         res.json({ neighborhoods });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };