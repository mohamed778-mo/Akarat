const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  
  date: { type: Date, required: true },
  note: { type: String },

  department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  department_name: { type: String, required: true },


}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema); 