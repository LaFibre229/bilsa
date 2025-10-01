// lib/schemas/transactionSchema.ts
import { number, z } from "zod";

// IBAN pattern (simplifié, à améliorer si besoin)
// const IBAN_REGEX = /^[A-Z]{2}\d{2}(?: ?[A-Z0-9]{4}){1,7}(?: ?[A-Z0-9]{1,4})?$/i


export const SenderReceiverSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Too small"),
  iban : z
  .string()
  .trim()
  .min(1, "IBAN is required ")
  .transform((val) => val.replace(/\s+/g, ""))
  .refine(
      (val) => /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(val), // validation sur l'IBAN nettoyé
      { message: "Invalid IBAN" }
    ),
});

export const TransactionSchema = z
  .object({
    accountId: z.string().min(1, "No accountId"),
    type: z.enum(["deposit", "withdraw", "transfer"]),
    amount: z.coerce
  .number()
  .refine((val) => !isNaN(val), { message: "Le montant doit être un nombre valide" }),
    senderInfos: SenderReceiverSchema.optional(),
    receiverInfos: SenderReceiverSchema.optional(),
    motif: z.string().max(255).optional(),
    // Nouveau champ : statut
  status: z.enum(['completed', 'in_process', 'failed']).optional(),
  })
  .superRefine((data, ctx) => {
    // 🚨 Validation conditionnelle
    if (data.type === "deposit") {
      if (!data.senderInfos) {
        ctx.addIssue({
          code: z.custom,
          path: ["senderInfos"],
          message: "Sender infos are required for a deposit",
        });
      }
    }

    if (data.type === "withdraw" || data.type === "transfer") {
      if (!data.receiverInfos) {
        ctx.addIssue({
          code: z.custom,
          path: ["receiverInfos"],
          message: "Receiver Infos are required for a transfer",
        });
      }
    }
  });

export default TransactionSchema;
