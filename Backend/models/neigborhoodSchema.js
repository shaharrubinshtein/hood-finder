const mongoose = require('mongoose')

const neighborhoodSchema = new mongoose.Schema({

neighborhood: {type: String},
city: {type: String},
state: {type: String},
average_age: {type: Number},
distance_from_city_center: {type: Number},
average_income: {type: Number},
public_transport_availability: {type: String},
latitude: {type: Number},
longitude: {type: Number} 
})

const Neighborhood = mongoose.model('Neighborhood', neighborhoodSchema)
module.exports  = Neighborhood 