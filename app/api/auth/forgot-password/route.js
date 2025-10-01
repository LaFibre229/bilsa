import { NextResponse } from "next/server";
import User from "@/lib/models/User.model";
import { connectDb } from "@/lib/config/dbConnect";
import crypto from "crypto";
import { sendEmail } from "@/lib/account/sendmail";// utilitaire à créer

export async function POST(req) {
  await connectDb();
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email requis" }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "Aucun utilisateur trouvé" }, { status: 404 });
  }

  // Générer un token unique
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenHashed = crypto.createHash("sha256").update(resetToken).digest("hex");

  // Stocker dans la DB
  user.resetPasswordToken = resetTokenHashed;
  user.resetPasswordExpire = Date.now() + 1000 * 60 * 5; // 5 minutes
  await user.save();

  const resetUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/reset-password/${resetToken}`;
   console.log(typeof user.email)
  // Envoyer l'e-mail
  await sendEmail({
    to: user.email,
    subject: "Réinitialisation de mot de passe",
    text: `
      Vous avez demandé une réinitialisation de mot de passe
      Cliquez ici pour continuer : ${resetUrl}
      Ce lien expire dans 5 minutes.
    `
  });

  return NextResponse.json({ message: "E-mail envoyé" }, { status: 200 });
}
