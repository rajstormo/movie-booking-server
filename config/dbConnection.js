const mongoose = require("mongoose");

const connectDB = async() => {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/movie-booking", {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  }
  catch(err) {
    console.log(err)
  }
}

module.exports = connectDB;

