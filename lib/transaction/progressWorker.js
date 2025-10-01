import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import Transaction from "../models/Transaction.model.js";
import { connectDb } from "../config/dbConnect.js";

async function updateProgress() {
    try {
    // Trouver les transactions in_process, non pausées et progress < 100
    const transactions = await Transaction.find({
      status: "in_process",
      "progress.isPaused": false,
      "progress.percent": { $lt: 100 },
    });

    for (const tx of transactions) {
      const increment = 1 + Math.random() * 0.5; // % à incrémenter à chaque passage
      let newPercent = tx.progress.percent + increment;

      if (newPercent >= 100) {
        newPercent = 100;
        tx.status = "completed"; // termine la transaction
      }

      tx.progress.percent = newPercent;

      await tx.save();

      console.log(
        `Transaction ${tx._id} mise à jour : progression ${newPercent}% - status ${tx.status}`
      );
    }
  } catch (err) {
    console.error("Erreur lors de la mise à jour des progressions :", err);
  }
}



async function main() {
  await connectDb()

  // Intervalle de mise à jour (1 seconde ici)
  setInterval(updateProgress, 30*1000);
}

main();