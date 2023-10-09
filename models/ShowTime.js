const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const showTimeSchema = new Schema({
  startTime: Date,
  endTime: Date,
  totalSeats: Number,
  minCostPerSeat: Decimal128,
  occupiedSeats: [Number],
  movie: mongoose.Schema.Types.ObjectId,
  bookingIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Booking'
  },
  seatIds : {
    type: [mongoose.Schema.Types.ObjectId],
    ref : 'Seat'
  }
});


module.exports = mongoose.model('ShowTime', showTimeSchema);