const mongoose = require('mongoose');

const neighborhoodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  type: { type: String, required: true },
  features: [{ type: String, required: true }],
  
  image_1: { type: String, required: true },
  image_2: { type: String, required: true },
  

 
  
}, 
{ timestamps: true });

module.exports = mongoose.model('Neighborhood', neighborhoodSchema); 