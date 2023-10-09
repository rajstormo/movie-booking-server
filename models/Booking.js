const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  showId: {
    type: Schema.Types.ObjectId,
    ref: 'ShowTime'
  },
  bookedSeatIds: {
    type: [Schema.Types.ObjectId],
    ref: 'Seat'
  },
  bookingStatus: Boolean,
  bookingCost: Decimal128
});

module.exports = mongoose.model('Booking',bookingSchema);