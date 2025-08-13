const mongoose = require('mongoose');

const formRealestateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    space: { type: String, required: true },
    location: { type: String, required: true },

    client_name: { type: String, required: true },
    client_phone: { type: String, required: true },
    client_gmail: { type: String, },

    
}, { timestamps: true });

module.exports = mongoose.model('FormRealestate', formRealestateSchema);