// app/api/admin/transactions/[id]/route.js
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/config/dbConnect";
import { verifyAdmin } from "@/lib/utils/verifyAdmin";
import Transaction from "@/lib/models/Transaction.model";

export async function PATCH(req, { params }) {
   await connectDb();
  try {
   
    verifyAdmin(req); // sécurise la route admin

    const body = await req.json();
    const { status } = body;
    const { id } = await params;

    if (!status) {
      return NextResponse.json({ message: "Statut requis" }, { status: 400 });
    }

    const updatedTx = await Transaction.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedTx) {
      return NextResponse.json({ message: "Transaction introuvable" }, { status: 404 });
    }

    return NextResponse.json(updatedTx, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
