import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import bcrypt from "bcryptjs";
dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// export const register = async (req, res) => {
//   try {
//     const { email, password, name } = req.body; // Include name in the request body

//     // Check if the user already exists
//     const userExists = await user
//       .findOne({ email })
//       .then((user) => user)
//       .catch((err) => {
//         console.log(err);
//         return null;
//       });
//     if (userExists) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create a new user with the hashed password and name
//     const newUser = new user({ email, password: hashedPassword, name });
//     await newUser.save();

//     // Generate a token
//     const token = generateToken(newUser._id);

//     return res.status(200).json({ token });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const obj = await User.create({ name, email, password });
    obj.password = await obj.encryptPassword(password);

    res.status(201).send({
      _id: obj._id,
      name: obj.name,
      email: obj.email,
      token: generateToken(obj._id),
    });

    await obj.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
