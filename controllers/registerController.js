const User = require("../models/User");
const bcrypt = require("bcrypt");

const validatePassword = (password) => {

  const passwordValidator = {
    specialCharacters: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
    digits: /[0-9]/,
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/
  }

  let errors = []
  if (!password) {
    errors.push("Password is required.");
  } else {
    if (!passwordValidator.specialCharacters.test(password)) {
      errors.push("Password must contain at least one special character.");
    }
    if (!passwordValidator.digits.test(password)) {
      errors.push("Password must contain at least one digit.");
    }
    if (!passwordValidator.lowercase.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!passwordValidator.uppercase.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    
    if (errors.length > 0)
      return errors;
  }
}

const validate = (firstName, lastName, username, email, password) => {
  const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!firstName || !lastName || !username || !email || !password)
    return "All fields are required";

  if (!validEmail.test(email))
    return "Please enter a valid email address";

  if (username.length < 3)
    return "username must be atleast 3 characters long";

  const passwordError = validatePassword(password);

  if (passwordError)
    return passwordError;
}

const handleNewUser = async(req, res) => {
  console.log("reached");
  const { firstName, lastName, username, email, password } = req.body;

  // validate inputs 
  const hasError = validate(firstName, lastName, username, email, password);

  if (hasError)
    return res.status(400).json({ error: hasError });

  try {
    // check for unique email and username 
    const user = await User.findOne({username: username});
    const emailExists = await User.findOne({email: email});

    
    if (user || emailExists)
      return res.status(409).json({error: "username or email already exists"});

    else {
      // hash the password 
      const hashedPassword = await bcrypt.hash(password,10);
      // create new user
      const newUser = new User({firstName: firstName, lastName: lastName, username: username, email:email, password: hashedPassword});
      const result = await newUser.save();
      console.log(result);
      res.status(201).json({success: `User ${result.username} created`});
    }
  }
  catch(err) {
    console.log(err);
    res.json({err});
  }
}

module.exports = { handleNewUser }