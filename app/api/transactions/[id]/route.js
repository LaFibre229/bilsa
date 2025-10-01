import { NextResponse } from "next/server";
import Transaction from "@/lib/models/Transaction.model";
import { connectDb } from "@/lib/config/dbConnect";
export async function GET(req, {params}) {
    await connectDb();
    const {id} = await params;

    try {
    const transaction = await Transaction.findById(id);
    if(!transaction){
        return NextResponse.json({message : "Transaction not found"}, {status : 404});

    }

    return NextResponse.json({transaction}, {status : 200});
        
    } catch (error) {

        return NextResponse.json({message : "Unable to get transaction details", error }, {status : 500});
        
    }
}