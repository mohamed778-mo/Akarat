const mongoose = require('mongoose');

const formDecorationSchema = new mongoose.Schema({

   decoration_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Decoration', required: true },
   decoration_name: { type: String, required: true },
   decoration_category: { type: String, required: true },

   name: { type: String, required: true },
   phone: { type: String, required: true },
   address: { type: String, required: true },

   place_space: { type: String, required: true },
   place_image_1: { type: String,  },
   place_image_2: { type: String,  },
   place_image_3: { type: String, },
   
   note: { type: String, }

}, {
   timestamps: true
});

module.exports = mongoose.model('FormDecoration', formDecorationSchema);