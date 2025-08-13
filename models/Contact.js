const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  gmail: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  
  facebook_link: { type: String,  },
  instagram_link: { type: String, },
  twitter_link: { type: String,  },
  linkedin_link: { type: String, },


}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema); 