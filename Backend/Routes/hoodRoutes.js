const express = require('express');
const router = express.Router();

const neighborhoodController = require('../controllers/hoodController');

//routes
router.get('/', neighborhoodController.getAllNeighborhoods);


module.exports = router;
