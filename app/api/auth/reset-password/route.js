import crypto from "crypto";
import User from "@/lib/models/User.model";
import { connectDb } from "@/lib/config/dbConnect";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDb();
  const { token, password } = await req.json();

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json({ message: "Lien invalide ou expiré" }, { status: 400 });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return NextResponse.json({ message: "Mot de passe mis à jour" }, { status: 200 });
}
