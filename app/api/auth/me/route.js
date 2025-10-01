import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/utils/verifyToken";
import jwt from "jsonwebtoken";
import Account from "@/lib/models/Account.model";
import User from "@/lib/models/User.model";
import Transaction from "@/lib/models/Transaction.model";
import { connectDb } from "@/lib/config/dbConnect";

export async function GET(req) {
  
   await connectDb();
  const decoded = await verifyToken(req);

  try {
    
    const user = await User.findById(decoded.userId).select("-password"); // on exclut le mot de passe

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const account = await Account.findOne({userId : user._id})
    if (!account) {
      return NextResponse.json({ message: "Account not found" }, { status: 404 });
    }

    const transactions = await Transaction.find({accountId : account._id})
    const transactionsArray = Array.isArray(transactions)
  ? transactions
  : transactions
    ? [transactions]
    : []

    return NextResponse.json({user,account,transactions : transactionsArray}, { status: 200 });
  } catch (err) {
    return NextResponse.json({message : "Unauthorized, invalidToken", err}, {status : 401})
  }
}
