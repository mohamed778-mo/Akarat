const mongoose = require('mongoose');

const finishesSchema = new mongoose.Schema({

    finishies: [{
        name: { type: String, required: true },
        image: { type: String, required: true },
        properties: [{
            type: String, required: true,


        }],
    }],

    main_image: { type: String, },
    main_image_2: { type: String, },
    main_image_3: { type: String, },
    main_image_4: { type: String, },


    process: [{
        name: { type: String, required: true },
        icon_image: { type: String, required: true },
        description: { type: String, required: true },
    }],


}, { timestamps: true });

module.exports = mongoose.model('Finish', finishesSchema);
