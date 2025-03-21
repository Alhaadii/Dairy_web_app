import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase().trim();

    let user = await User.findOne({ email });

    if (!user)
      return res.status(402).json({
        error: "Invalid Credentials",
      });

    const comparedPassword = await user.checkPassword(password);

    if (user && comparedPassword) {
      return res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        error: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};
