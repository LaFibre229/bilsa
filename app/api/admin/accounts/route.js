// api/admin/accounts
import { connectDb } from "@/lib/config/dbConnect";
import { verifyAdmin } from "@/lib/utils/verifyAdmin";
import Account from "@/lib/models/Account.model";
import User from "@/lib/models/User.model";
import Transaction from "@/lib/models/Transaction.model";
import { NextResponse } from "next/server";
// @desc Get all accounts
// @access Admin only
// @route GET/api/admin/accounts
export async function GET(req) {
  await connectDb()
  try {
    
    const admin = verifyAdmin(req) // vérifie que c'est un admin

    const users = await User.find({role : "user"})

    const enrichedUsers = await Promise.all(
      users.map(async (user) => {
       
         const account = await Account.findOne({ userId: user._id })

          let transactions = []

        if (account) {
          transactions = await Transaction.find({ accountId: account._id })
        }

        return {
          user,
          account,
          transactions,
        }

        
       
       
      })
    )

    return NextResponse.json(enrichedUsers, { status: 200 })
  } catch (error) {
    console.error("Erreur API admin/accounts:", error)
    return Response.json(
      { message: error.message || "Erreur serveur" },
      { status: 500 }
    )
  }
}