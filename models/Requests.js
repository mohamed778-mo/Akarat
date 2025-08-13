const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  message: { type: String, required: true },



}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;