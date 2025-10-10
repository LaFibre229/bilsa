"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api/api";
import { toast } from "sonner";
import { createTransactionSchema } from "@/lib/schemas/TransactionSchema";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { IconAlertTriangle } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";

const CreateTransactionForm = ({ accountId, context = "client", defaulType = "transfer" }) => {
  const router = useRouter();
  const t = useTranslations("create-transaction");
   const validationMessages = useTranslations("errors");
   const schema =  createTransactionSchema(validationMessages);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      accountId,
      type: defaulType,
      amount: '0',
      motif: "",
      ...(context === "admin" && { status: "in_process" }),
    },
    shouldUnregister: true,
  });

  const type = watch("type");

  const onSubmit = async (data) => {
    if (data.type !== "transfer") {
      data.receiverInfos = undefined;
    }

    if (data.type !== "transfer" && data.type !== "deposit") {
      data.senderInfos = undefined;
    }

    try {
      const res = await api.post("/transactions", data);
      if (res.status === 201) {
        toast.success(t("success.created"));
        reset();

        if (context === "admin") {
          router.push("/admin/adminDashboard/accounts");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      const status = err.response?.status;
      if (status === 400) toast.error(t("insufficient_funds"));
      else if (status === 403) toast.error(t("verification_required"));
      else if (status === 500) toast.error(t("server"));
      else toast.error(t("unknown"));
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className={'rounded-sm'}>
        <CardHeader>
          <CardTitle className={'text-center text-textGreen text-lg'}>
            {t("title")}
          </CardTitle>
          <CardDescription className={'text-center py-4 font-roboto'}>
            {t("subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("accountId")} />
            <div className="flex flex-col gap-6 text-textGreen">
              <div className="flex flex-col space-y-2">
                <span className='text-sm text-textGreen'>{t("type")}</span>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-row items-center">
                      {context === "admin" && (
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="deposit" id="r1" />
                          <Label htmlFor="r1" className="text-xl">{t("deposit")}</Label>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="transfer" id="r2" />
                        <Label htmlFor="r2" className="text-xl">{t("transfer")}</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>

              <div className="grid gap-3">
                <Label className={'font-montserrat font-medium'} htmlFor="amount">{t("amount")}</Label>
                <Input id="amount" type="text" placeholder="100.0" {...register('amount')} />
                {errors.amount && (
                  <div className="flex flex-row gap-3 items-center text-red-700">
                    <IconAlertTriangle />
                    {errors.amount.message}
                  </div>
                )}
              </div>

              <div className="grid gap-3">
                <Label className={'font-montserrat font-medium'} htmlFor="motif">{t("motif")}</Label>
                <Input id="motif" type="text" {...register('motif')} />
              </div>

              {context === "admin" && (
                <div className="flex flex-col space-y-2">
                  <span className='text-sm text-textGreen'>{t("status")}</span>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-row items-center">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="in_process" id="r1" />
                          <Label htmlFor="r1" className="text-xl">{t("in_process")}</Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="completed" id="r2" />
                          <Label htmlFor="r2" className="text-xl">{t("completed")}</Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="failed" id="r3" />
                          <Label htmlFor="r3" className="text-xl">{t("failed")}</Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                  {errors.status && (
                    <p className="text-sm text-red-600">{errors.status.message}</p>
                  )}
                </div>
              )}

              {type === "deposit" && (
                <div className="py-4 px-3 border rounded-md flex flex-col space-y-3">
                  <h4 className="font-medium mb-2 font-montserrat">{t("sender_infos")}</h4>
                  <Input type="text" {...register('senderInfos.name')} placeholder={t("name")} />
                  {errors.senderInfos?.name && (
                    <div className="flex flex-row gap-3 items-center text-red-700">
                      <IconAlertTriangle />
                      {errors.senderInfos.name.message}
                    </div>
                  )}
                  <Input type="text" {...register('senderInfos.iban')} placeholder={t("iban")} />
                  {errors.senderInfos?.iban && (
                    <p className="text-sm text-red-600">{errors.senderInfos.iban.message}</p>
                  )}
                </div>
              )}

              {type === "transfer" && (
                <>
                  <div className="py-4 px-3 border rounded-md flex flex-col space-y-3">
                    <h4 className="font-medium mb-2 font-montserrat">{t("recipient_infos")}</h4>
                    <Input type="text" {...register('receiverInfos.name')} />
                    {errors.receiverInfos?.name && (
                      <div className="flex flex-row gap-3 items-center text-red-700">
                        <IconAlertTriangle />
                        {errors.receiverInfos.name.message}
                      </div>
                    )}
                    <Input type="text" {...register('receiverInfos.iban')} />
                    {errors.receiverInfos?.iban && (
                      <div className="flex flex-row gap-3 items-center text-red-700">
                        <IconAlertTriangle />
                        {errors.receiverInfos.iban.message}
                      </div>
                    )}
                  </div>

                  {/* <div className="py-4 px-3 border rounded-md flex flex-col space-y-3">
                    <h4 className="font-medium mb-2 font-montserrat">{t("sender_infos")}</h4>
                    <Input type="text" {...register('senderInfos.name')} placeholder={t("name")} />
                    {errors.senderInfos?.name && (
                      <div className="flex flex-row gap-3 items-center text-red-700">
                        <IconAlertTriangle />
                        {errors.senderInfos.name.message}
                      </div>
                    )}
                    <Input type="text" {...register('senderInfos.iban')} placeholder={t("iban")} />
                    {errors.senderInfos?.iban && (
                      <div className="flex flex-row gap-3 items-center text-red-700">
                        <IconAlertTriangle />
                        {errors.senderInfos.iban.message}
                      </div>
                    )}
                  </div> */}
                  
                </>
              )}

              <div className="flex flex-row justify-end">
                <button
                  className="rounded-lg bg-goldButton mt-6 py-2 w-full md:w-[200px] cursor-pointer text-textGreen font-inter"
                  type="submit"
                >
                  {isSubmitting ? t("sending") : t("send")}
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTransactionForm;
