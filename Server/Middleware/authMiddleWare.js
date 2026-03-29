import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_KEY;

const authMiddleWare = (req, res, next) => {
  try {
    // ✅ Check header exists
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = req.headers.authorization.split(" ")[1];

    // ✅ Verify token
    const decoded = jwt.verify(token, secret);

    // ✅ Store userId safely
    req.userId = decoded?.id;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleWare;