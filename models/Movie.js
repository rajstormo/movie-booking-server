const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String, 
    required: true,
  }, 
  description: {
    type: String,
    required: true
  },
  releasedOn: {
    type: Date,
    required: true
  },
  poster: String,
  runtime: Schema.Types.Decimal128,
  imbdRating: Schema.Types.Decimal128,
  director: String,
  writer: String,
  genre: [String],
  language: [String],
  actors: [String]
});

module.exports = mongoose.model('Movie',movieSchema);