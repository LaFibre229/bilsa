import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    type: { type: String, enum: ["deposit", "withdraw", "transfer"], required: true },
    amount: { type: Number, required: true },

    // Infos sur l'expéditeur (optionnel, ex: virement entrant)
    senderInfos: {
      name: { type: String },
      iban: { type: String },
    },

    // Infos sur le destinataire (optionnel, ex: virement sortant)
    receiverInfos: {
      name: { type: String },
      iban: { type: String },
    },

    // Motif de la transaction
    motif: { type: String },

    // Statut par défaut
    status: { type: String, enum: ["in_process", "completed", "failed"], default: "in_process" },

  
    actualCode: {
      code: { type: String },
      isVerified: { type: Boolean, default: false },
    },

    progress: {
      percent: { type: Number, default: 2 },
      isPaused: { type: Boolean, default: false },
    },
    
  },

  
  { timestamps: true }
);

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
