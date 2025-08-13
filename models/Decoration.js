const mongoose = require('mongoose');

const decorationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image_1: { type: String, required: true },
    image_2: { type: String, required: true },
    image_3: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
});

const Decoration = mongoose.model('Decoration', decorationSchema);

module.exports = Decoration;
