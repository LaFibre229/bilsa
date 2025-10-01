import { NextResponse } from "next/server";
import Transaction from "@/lib/models/Transaction.model";
import { connectDb } from "@/lib/config/dbConnect";

export async function POST(req) {
  await connectDb(); // important : se connecter à la DB

  try {
    const body = await req.json();
    const { transactionId, code } = body;

    if (!transactionId || !code) {
      return NextResponse.json(
        { success: false, message: "Transaction ID et code requis." },
        { status: 400 }
      );
    }

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return NextResponse.json(
        { success: false, message: "Transaction non trouvée." },
        { status: 404 }
      );
    }

    // Vérifie que le code correspond
    if (
      transaction.actualCode &&
      transaction.actualCode.code === code &&
      !transaction.actualCode.isVerified
    ) {
      // Mettre à jour la transaction : code vérifié, progression reprend
      transaction.actualCode.isVerified = true;
      transaction.progress.isPaused = false;

      await transaction.save();

      return NextResponse.json({
        success: true,
        message: "Code vérifié, progression relancée.",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Code invalide ou déjà utilisé." },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du code :", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    );
  }
}
