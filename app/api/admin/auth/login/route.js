// app/api/admin/auth/login/route.js
import { connectDb } from "@/lib/config/dbConnect";
import User from "@/lib/models/User.model";
import { comparePassword } from "@/lib/utils/hashPassword";
import generateToken from "@/lib/utils/generateToken";
import { NextResponse } from "next/server";
import { connect } from "mongoose";

export async function POST(req) {
  await connectDb();
  const { email, password } = await req.json();
   
  try {
    const user = await User.findOne({ email });

    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
    }

    // Crée une réponse JSON de base
    const response = NextResponse.json(
      {
        message: "Successfully connected",
        token: null, // valeur temporaire, juste pour structure
        user: {
          id: user._id,
          firstname: user.firstname,
          surname: user.surname,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    // Injecte le cookie (et renvoie aussi le token dans le body si tu veux)
    const token = generateToken(user._id, user.role, response);

    const body = await response.json();
    body.token = token;

    return NextResponse.json(body, {
          status: 200,
          headers: response.headers,
        });


  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while logging in",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
