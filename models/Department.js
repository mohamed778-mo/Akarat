const mongoose = require('mongoose');


const departmentSchema = new mongoose.Schema({

    title: { type: String, required: true },

    status_of_sale: { type: String, required: true },

    price: { type: Number, required: true },

    number_of_bathrooms: { type: Number, required: true },

    number_of_bedrooms: { type: Number, required: true },

    space: { type: String, required: true },

    type: { type: String, required: true },


    // details

    location: { type: String, required: true },

    image_1: { type: String, required: true },
    image_2: { type: String, required: true },
    image_3: { type: String, required: true },
    image_4: { type: String, required: true },

    description: { type: String, required: true },

    features: [{ type: String, required: true }],

    // neighborhood_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Neighborhood', required: true },
    // neighborhood_name: { type: String, required: true },

    designer: { type: String, default: null, required: true },

    installment: { type: Boolean, default: false, required: true },

    note: { type: String, default: null, required: true },

    available_dates: [{
         type: String, required: true 
      
    }],



}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
