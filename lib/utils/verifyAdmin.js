// lib/verifyAdmin.js
import jwt from "jsonwebtoken";

export const verifyAdmin = (req) => {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      throw new Error("Access denied: Admins only");
    }
    return decoded;
  } catch (err) {
    throw new Error("Invalid token or unauthorized");
  }
};
