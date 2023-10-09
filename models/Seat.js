const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  seatNumber : {
    type: Number,
    required: true,
  },
  seatRow : {
    type: Number,
    required: true,
  },
  costMultiplier: {
    type: Number,
    default: 1.0
  },
  showTimeId: {
    type: Schema.Types.ObjectId,
    ref: 'ShowTime'
  },
  isBooked: Boolean
});

module.exports = mongoose.model('Seat',seatSchema);