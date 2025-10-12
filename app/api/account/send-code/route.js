// app/api/auth/send-code/route.js
import { connectDb } from "@/lib/config/dbConnect";
import User from "@/lib/models/User.model";
import { sendEmail } from "@/lib/account/sendmail";
import Account from "@/lib/models/Account.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDb();
  try {

    const { email, plan, currency } = await req.json();
  

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
    account.currency = currency;
    await account.save();
     
    // Envoyer l'e-mail
      await sendEmail({
        to: user.email,
        subject: "Bilsa Account Validation",
        html: `
        <p style = "font-size : 22px; font-weight:500;"> Hello ${user.firstname} </p>
          <p style="font-size : 18px">Your accound validation code is: <span style ="font-size:22px; font-weight:bold; color : #002E3C">${code}</span> . 
          This code will expire at <span style = "color : #002E3C font-weight:500">${user.codeExpires.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          })}</span> </p></br>
           <p style="font-size: 14px; color: #555;">Check your account for an overview.</p>
        <p>Thanks</p>
        <p style="font-size: 12px; color: #999;">— Bilsa Bank, the bank that fits in your pocket</p>
        `
      });
    

  

  return NextResponse.json({message : "Code sent "}, {status : 200})
    
  } catch (error) {
     console.error(error);
     return NextResponse.json({message : "Error sending code ", error: error.message}, {status : 500});
  }
}
