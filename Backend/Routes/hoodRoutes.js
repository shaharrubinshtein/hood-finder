const express = require('express');
const router = express.Router();

const neighborhoodController = require('../controllers/hoodController');

//routes
router.get('/', neighborhoodController.getAllNeighborhoods);
router.get('/ageRange', neighborhoodController.getByAgeRange);
router.get('/maxDistance', neighborhoodController.getByDistance);
router.get('/sortBy', neighborhoodController.getSortedBy);


module.exports = router;
