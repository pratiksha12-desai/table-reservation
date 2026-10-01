import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

  if (!token) {
    return res.json({ success: false, message: "Not authorized, please login again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, { attributes: { exclude: ["password"] } });

    if (!user) {
      return res.json({ success: false, message: "Not authorized, please login again" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.json({ success: false, message: "Not authorized, please login again" });
  }
};
