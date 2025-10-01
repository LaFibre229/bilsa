// app/api/account/verify-code/route.js
import { NextResponse } from "next/server";
import User from "@/lib/models/User.model";
import Account from "@/lib/models/Account.model";
import { connectDb } from "@/lib/config/dbConnect";



export async function POST(req) {
 await connectDb();

  try {
    const { email, code } = await req.json();

    // Vérifier user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({message :"User not found"}, {status : 404});
    }

    // Vérifier si code est valide
    if (!user.verificationCode || user.verificationCode !== code) {
      return NextResponse.json({message : "Invalid code "}, {status : 400})
    }

    if (user.codeExpires < Date.now()) {
      return NextResponse.json({message : "Code expired "}, {status : 400})
    }

    // Récupérer le compte
    const account = await Account.findOne({ userId: user._id });
    if (!account) {
      return NextResponse.json({message : "Account not found "}, {status : 404})
    }

    // Appliquer le plan et nettoyer pendingPlan
    if (account.pendingPlan) {
      account.plan = account.pendingPlan;
      account.pendingPlan = null;
    }

    // Valider user
    user.isVerified = true;
    user.verificationCode = null;
    user.codeExpires = null;
    
    // Modifier le statut du compte
    account.statut = "active";
    await user.save();
    await account.save();

    return NextResponse.json({ message: "Account verified successfully", plan: account.plan }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error verifying code", error: error.message }, { status: 500 });
  }
}
