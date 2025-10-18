import { NextResponse } from "next/server";
import { connectDb } from "@/lib/config/dbConnect";
import Transaction from "@/lib/models/Transaction.model";
import { generateProgressCode } from "@/lib/transaction/generateProgressCode";




export async function POST(req) {

    await connectDb();
    try {
        const {transactionId} = await req.json();
        if(!transactionId){
            return NextResponse.json({error : "No transaction id"},{status : 400} )
        }

        const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return NextResponse.json({ error: "Transaction non trouvée" }, { status: 404 });
    }

    const nameAndCode = generateProgressCode();
    const code = nameAndCode?.code
    const name = nameAndCode?.name
    transaction.actualCode = {
      name,
      code,
      isVerified: false,
    };

     transaction.progress = transaction.progress || {};
    transaction.progress.isPaused = true;

    await transaction.save();

     return NextResponse.json({ success: true, code, name });
        
    } catch (error) {
        return NextResponse.json({message : " Server Error"}, {status : 500})
    }
}