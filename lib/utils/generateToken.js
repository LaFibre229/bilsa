// lib/utils/generateToken.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const generateToken = (userId, role, response) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  response.cookies.set({
    name: "jwt",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60, // 3 jours en secondes
    path: "/",
  });

  return token;
};

export default generateToken;
