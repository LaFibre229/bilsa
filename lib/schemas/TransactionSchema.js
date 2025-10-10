// lib/schemas/transactionSchema.js
import { z } from "zod";

export const createTransactionSchema = (t) => {
  const SenderReceiverSchema = z.object({
    name: z.string().min(1, t("nameRequired")).max(100, t("nameTooLong")),
    iban: z
      .string()
      .trim()
      .min(1, t("ibanRequired"))
      .transform((val) => val.replace(/\s+/g, ""))
      .refine(
        (val) => /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(val),
        { message: t("ibanInvalid") }
      ),
  });

  return z
    .object({
      accountId: z.string().min(1, t("noAccountId")),
      type: z.enum(["deposit", "withdraw", "transfer"]),
      amount: z.coerce.number().refine((val) => !isNaN(val), {
        message: t("amountInvalid"),
      }),
      senderInfos: SenderReceiverSchema.optional(),
      receiverInfos: SenderReceiverSchema.optional(),
      motif: z.string().max(255).optional(),
      status: z.enum(["completed", "in_process", "failed"]).optional(),
    })
    .superRefine((data, ctx) => {
      if (data.type === "deposit" && !data.senderInfos) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["senderInfos"],
          message: t("senderRequired"),
        });
      }

      if ((data.type === "withdraw" ) && !data.receiverInfos) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["receiverInfos"],
          message: t("receiverRequired"),
        });
      }
    });
};
