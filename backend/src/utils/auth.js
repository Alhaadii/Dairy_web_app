import jwt from "jsonwebtoken";
import User from "../api/models/User.js";

export const isAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
      req.user = await User.findById(decoded.id).select("-password");
      if (req.user) {
        return next();
      }
      return res.status(401).json({ error: "Not authorized, token failed" });
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }
  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }
};
