const mongoose = require('mongoose');

const finishFormSchema = new mongoose.Schema({
  name: { type: String, required: true },

  phone: { type: String, required: true },
  
  space: { type: String, required: true },

  location: { type: String , required: true },

  service: { type: String, required: true },


}, { timestamps: true });

module.exports = mongoose.model('FinishForm', finishFormSchema); 