const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/dbConnection");

// routes
const auth = require("./routes/auth/auth")
const movies = require("./routes/movie/movie")

const verifyToken = require('./middlewares/verifyToken')

// connect to database
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/auth',auth);
app.use('/api',movies);

app.get('/api/login-status', verifyToken, (req, res) => {
  return res.status(200).json({...req.user._doc});
});

mongoose.connection.once("open", () => {
  console.log("connected to DB");
  app.listen(3000, () => console.log("listening to port 3000"));
})


