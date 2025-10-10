import { NextResponse } from 'next/server';
import Transaction from '@/lib/models/Transaction.model';
import { connectDb } from '@/lib/config/dbConnect';

export async function GET() {
  try {
    await connectDb();

    const transactions = await Transaction.find({
      status: "in_process",
      "progress.isPaused": false,
      "progress.percent": { $lt: 100 },
    });

    for (const tx of transactions) {
      const increment = 1.5 + Math.random() * 0.5;
      let newPercent = tx.progress.percent + increment;

      if (newPercent >= 100) {
        newPercent = 100;
        tx.status = "completed";
      }

      tx.progress.percent = newPercent;
      await tx.save();
    }

    return NextResponse.json({ message: "Transactions mises à jour." });
  } catch (error) {
    console.error("Erreur updateProgress :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
