export const runtime = 'nodejs'; // ou 'nodejs' selon ta logique
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import Transaction from '@/lib/models/Transaction.model';
import { connectDb } from '@/lib/config/dbConnect';




// ATTENTION : ajouter cette ligne pour dire à Vercel que c'est une scheduled function
export const schedule = '*/1 * * * *'; // toutes les 1 minutes


export async function GET(req) {
   // Vérifie la clé secrète envoyée par le cron externe
  const authKey = req.headers.get("x-cron-key");
  if (authKey !== process.env.CRON_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDb();
    console.log("✅ Scheduled function triggered automatiquement", new Date().toISOString());

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
