"use client";

import React from "react";
import { useForm , Controller} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api/api";
import { toast } from "sonner";
import TransactionSchema from "@/lib/schemas/TransactionSchema";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { IconAlertTriangle } from "@tabler/icons-react";
import { Label } from "@/components/ui/label"
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const CreateTransactionForm = ({ accountId , context ="client", defaulType = "transfer"}) => {
const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(TransactionSchema),
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

    if (data.type !== "transfer" ) {
    data.receiverInfos = undefined;
  }
     
  if (data.type !== "transfer" && data.type !== "deposit") {
    data.senderInfos = undefined;
  }
  console.log("payload envoyé ", data)

  try {
    const res = await api.post("/transactions", data);
    if (res.status === 201) {
      toast.success("Transaction created successfully.");
      reset();


                // Redirection selon le contexte
            if (context === "admin") {
              router.push("/admin/adminDashboard/accounts");
            } else {
              router.push("/dashboard");
            }

    } 
  } catch (err) {
  if (err.response?.status === 400) {
    toast.error("Oops! You don't have enough funds to make this transfer.");
  } else if (err.response?.status === 403) {
    toast.error("You cannot perform this operation. Verify your account and try later");
  } else if (err.response?.status === 500) {
    toast.error("Server error . Please Try again later");
  } else {
    toast.error("Unknown Error");
  }

  console.error(err);
}
};
console.log(errors)
  return (
    <>
   
  
    <div className="flex flex-col gap-6">
      <Card className={'rounded-sm'}>
        <CardHeader>
         <CardTitle className={'text-center text-textGreen text-lg'}>
          Transfer Funds Seamlessly with Bilsa Bank
        </CardTitle>
        <CardDescription className={'text-center py-4 font-roboto'}>
          Send money to friends, family, or colleagues in just a few taps — fast, secure, and hassle-free.
        </CardDescription>

        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("accountId")} />
            <div className="flex flex-col gap-6 text-textGreen">
                 
                   <div className="flex flex-col space-y-2">


      <span className='text-sm text-textGreen'>Type</span>
  

    <Controller
  name="type"
  control={control}
  render={({ field }) => (
    <RadioGroup
      value={field.value}
      onValueChange={field.onChange}
      className="flex flex-row items-center"
    >
      {context === "admin" && (
       <div className="flex items-center gap-3">
        <RadioGroupItem value="deposit" id="r1" />
        <Label htmlFor="r1" className="text-xl">Deposit</Label>
      </div>
      )}
      
      <div className="flex items-center gap-3">
        <RadioGroupItem value="transfer" id="r2" />
        <Label htmlFor="r2" className="text-xl">Transfer</Label>
      </div>
      
    </RadioGroup>
  )}
/>

        </div>
              
              <div className="grid gap-3">
                <Label className={'font-montserrat font-medium'} htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="text"
                  // step="0.01"
                  placeholder="100.0"
                  {...register('amount')}
                />
                 {errors.amount && (
            
             <div className="flex flex-row gap-3 items-center text-red-700">
                <IconAlertTriangle/>
                {errors.amount.message}
              </div>

          )}
              </div>

             

              <div className="grid gap-3">
              
                  <Label className={'font-montserrat font-medium'} htmlFor="motif">Motif</Label>
                 
                <Input 
                id="motif" 
                type="text" 
                placeholder ="Eg: danation "
                {...register('motif')}
                />
              </div>

              {context === "admin" && (
   <div className="flex flex-col space-y-2">


      <span className='text-sm text-textGreen'>Statut</span>
  

    <Controller
  name="status"
  control={control}
  render={({ field }) => (
    <RadioGroup
      value={field.value}
      onValueChange={field.onChange}
      className="flex flex-row items-center"
    >
      <div className="flex items-center gap-3">
        <RadioGroupItem value="in_process" id="r1" />
        <Label htmlFor="r1" className="text-xl">In process</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="completed" id="r2" />
        <Label htmlFor="r2" className="text-xl">Completed</Label>
      </div>

      <div className="flex items-center gap-3">
        <RadioGroupItem value="failed" id="r2" />
        <Label htmlFor="r2" className="text-xl">Failed</Label>
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
          <h4 className="font-medium mb-2 font-montserrat">Sender 's Infos</h4>
          <Input
            type="text"
            {...register('senderInfos.name')}
            placeholder="Nom"
            className="w-full outline-none rounded-md border px-3 py-2 mb-2"
          />
          {errors.senderInfos?.name && (
             <div className="flex flex-row gap-3 items-center text-red-700">
                <IconAlertTriangle/>
                {errors.senderInfos.name.message}
              </div>
          )}
          <Input
            type="text"
            {...register('senderInfos.iban')}
            placeholder="IBAN"
            className="w-full outline-none rounded-md border px-3 py-2"
          />
          {errors.senderInfos?.iban && (
            <p className="text-sm text-red-600">{errors.senderInfos.iban.message}</p>
          )}
        </div>
      )}

      {/* ReceiverInfos si withdraw/transfer */}
      {(type === "transfer") && (
        <>
        <div className="py-4 px-3 border rounded-md flex flex-col space-y-3">
          <h4 className="font-medium mb-2 font-montserrat">Recipient Infos</h4>
          <Input
            type="text"
            {...register('receiverInfos.name')}
            placeholder="Name"
            className={'outline-none'}
          />
          {errors.receiverInfos?.name && (
            <div className="flex flex-row gap-3 items-center text-red-700">
                <IconAlertTriangle />
                {errors.receiverInfos.name.message}
              </div>
          )}
          <Input
            type="text"
            {...register('receiverInfos.iban')}
            placeholder="IBAN"
            className="w-full rounded-md border px-3 py-2 outline-none"
          />
          {errors.receiverInfos?.iban && (
            <div className="flex flex-row gap-3 items-center text-red-700">
                <IconAlertTriangle />
                {errors.receiverInfos.iban.message}
              </div>
          )}
        </div>

        <div className="py-4 px-3 border rounded-md flex flex-col space-y-3">
          <h4 className="font-medium mb-2 font-montserrat">Sender's Infos</h4>
          <Input
            type="text"
            {...register('senderInfos.name')}
            placeholder="Name"
            className={'outline-none'}
          />
          {errors.senderInfos?.name && (
            <div className="flex flex-row gap-3 items-center text-red-700">
                <IconAlertTriangle />
                {errors.senderInfos.name.message}
              </div>
          )}
          <Input
            type="text"
            {...register('senderInfos.iban')}
            placeholder="IBAN"
            className="w-full rounded-md border px-3 py-2 outline-none"
          />
          {errors.senderInfos?.iban && (
            <div className="flex flex-row gap-3 items-center text-red-700">
                <IconAlertTriangle />
                {errors.senderInfos.iban.message}
              </div>
          )}
        </div>

        
        </>
      )}

      <div className="flex flex-row justify-end">
        <button className='rounded-lg bg-goldButton mt-6 py-2 w-full md:w-[200px] cursor-pointer text-textGreen font-inter '
          type='submit'
          
          >
            
          {isSubmitting ? "Sending..." : "Send"}
        </button>  
      </div>

     
             
            </div>

             
            
          </form>
        </CardContent>
      </Card>
    </div>
      
     
                              </>
  );
};

export default CreateTransactionForm;
