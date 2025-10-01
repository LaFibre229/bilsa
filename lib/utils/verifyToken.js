
import jwt from "jsonwebtoken";

export const verifyToken = async (req) => {
  // const cookieStore = await cookies();
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // contient userId et role
  } catch (err) {
    throw new Error("Invalid token");
  }
};
