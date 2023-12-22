const mongoose = require('mongoose')

const neighborhoodSchema = new mongoose.Schema({

"neigborhood": {type: String},
"city": {type: String},
"state": {type: String},
"average age": {type: Number},
"distance from city center": {type: Number},
"average income": {type: Number},
"public transport availability": {type: String},
"latitude": {type: Number},
"longitude": {type: Number} 
})

const Neighborhood = mongoose.model('Neighborhood', neighborhoodSchema)
module.exports  = Neighborhood 