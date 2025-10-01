// app/api/auth/send-code/route.js
import { connectDb } from "@/lib/config/dbConnect";
import User from "@/lib/models/User.model";
import { sendEmail } from "@/lib/account/sendmail";
import Account from "@/lib/models/Account.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDb();
  try {

    const { email, plan } = await req.json();
  

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({message : "User not found"}, {status : 404});
 
  const account = await Account.findOne({userId : user._id});
  if(!account) return  NextResponse.json({message : "No such account"}, {status : 404});
  // Générer un code à 6 chiffres
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Stocker le code et sa date d'expiration
  user.verificationCode = code;
  user.codeExpires = Date.now() + 3 * 60 * 1000; 
  await user.save();

  // Sauvegarder plan temporaire dans Account
    account.pendingPlan = plan;
    await account.save();

    // Envoyer l'e-mail
      await sendEmail({
        to: user.email,
        subject: "Bilsa Account Validation",
        text: `
        <p> Hello ${user.firstname} </p>
          <p>Your Verification code is: <span style ="font-size:24px; font-weight:bold; color : #FAB12F">${code}</span> </p>
          <p style="color: hsl(227, 12%, 61%); font-size: 2px ">Bilsa , The Bank that fits in your pocket </p>
        `
      });
    

  

  return NextResponse.json({message : "Code sent "}, {status : 200})
    
  } catch (error) {
     console.error(error);
     return NextResponse.json({message : "Error sending code ", error: error.message}, {status : 500});
  }
}
