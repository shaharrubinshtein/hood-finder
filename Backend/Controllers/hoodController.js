const Neighborhood = require('../Models/neigborhoodSchema');

// const fs = require('fs');

// //load json file into mongo db - only once! 
// let neighborhoodData = fs.readFileSync('./db/neighborhoods_data.json');
// console.log(neighborhoodData);
// let neighborhoods = JSON.parse(neighborhoodData)
// Neighborhood.insertMany(neighborhoods)



//get all neighborhoods
exports.getAllNeighborhoods = async (req, res) => {
  try {

    const neighborhoods = await Neighborhood.find({});

    if (neighborhoods) {
      res.json({ neighborhoods });
    }
    else
      res.status(404).send('not found')
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// fetch all neighborhood by ageRange between min and max values - send ageRange?minAge="value"&maxAge="value"
exports.getByAgeRange = async (req, res) => {
  try {

    let minAge = req.query.minAge
    let maxAge = req.query.maxAge

    if (!minAge || !maxAge) {
      throw new Error("please fill a valid min and max age");
    }

    minAge = parseInt(minAge);
    maxAge = parseInt(maxAge);

    if (minAge < 0 || minAge > 120) {
      throw new Error("please enter a valid age");
    }

    const neighborhoods = await Neighborhood.find({ $and: [{ 'average age': { $gte: minAge } }, { 'average age': { $lte: maxAge } }] });

    if (neighborhoods) {
      res.json({ neighborhoods });
    }

    else
      res.status(404).send('not found')
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// fetch all neighborhood by max distane from city center - send maxDistance?distance="value"
exports.getByDistance = async (req, res) => {
  try {

    let distance = req.query.distance

    if (!distance) {
      throw new Error("please fill a number");
    }

    distance = parseFloat(distance);

    if (distance < 0) {
      throw new Error("please enter a valid distance");
    }

    const neighborhoods = await Neighborhood.find({ 'distance from city center': { $lte: distance } });

    if (neighborhoods) {
      res.json({ neighborhoods });
    }
    else
      res.status(404).send('not found')
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// fetch all neighborhood sorted by field and order (1 for ascending, -1 for descending) - send sortBy?field="value"&order="1"
exports.getSortedBy = async (req, res) => {
  try {

    let field = req.query.field
    let order = req.query.order

    order = parseInt(order);

    if (!field || !order) {
      throw new Error("please fill a field and an order[1,-1]");
    }

    if (order != 1 && order != -1) {
      throw new Error("order value should be 1 for ascending and -1 for descending");
    }

    const neighborhoods = await Neighborhood.find({ [field]: { $exists: true } }).sort({ [field]: order });

    if (neighborhoods === undefined || neighborhoods.length == 0) {
      throw new Error("please enter a valid field");
    }

    if (neighborhoods) {
      res.json({ neighborhoods });
    }

    else
      res.status(404).send('not found')
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

