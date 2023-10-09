
const User = require('../models/User')

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET); 
}

const handleLogin = async (req, res) => {
  const {user_email, password} = req.body;

  if (!user_email || !password)
    return res.status(400).json({error: "All fields are required"});
  
  try {
    let checkLoginUser;
    if (user_email.includes('@'))
      checkLoginUser = await User.findOne({email: user_email});
    else 
      checkLoginUser = await User.findOne({username: user_email});


    if (!checkLoginUser)
      return res.status(400).json({error: `User ${user_email} doesn't exist`});

    const decryptPassword = await bcrypt.compare(password, checkLoginUser.password);

    if (!decryptPassword)
      return res.status(400).json({error: "Invalid username or password"});
    else {
      const payload = {_id : checkLoginUser._id};
      const accessToken = generateAccessToken(payload);
      res.status(200).json({accessToken, user: {...checkLoginUser._doc, password: null}}); 
    }
  }
  catch(err) {
    console.log(err);
    res.status(500).json({error: err});
  }
}

module.exports = {handleLogin}