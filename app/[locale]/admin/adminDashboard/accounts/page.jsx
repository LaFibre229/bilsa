'use client'

import * as React from "react"
import { useEffect, useState } from 'react'
import api from '@/lib/api/api'
import { toast } from 'sonner'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import FullPageLoader from "@/components/FullPageLoader"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import Link from "next/link"

const accountsPage = () => {
    const [accounts, setAccounts] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        const fetchAccountsList = async () =>{
            try {
                const res = await  api.get("/admin/accounts");
                setAccounts(res.data);

            } catch (error) {
                toast.success("Error fetching accounts lists")
                console.log(error);
            }finally{
                setIsLoading(false)
            }
            
        }
        fetchAccountsList();
    },[])


    const handleStatusChange = async (transactionId, newStatus) => {
  try {
    await api.patch(`/admin/transactions/${transactionId}`, {
      status: newStatus, 
    });

    toast.success("Statut mis à jour avec succès");

    // Optionnel : mettre à jour l’état local pour refléter le changement sans refetch
    setAccounts((prevAccounts) =>
      prevAccounts.map((ac) => ({
        ...ac,
        transactions: ac.transactions.map((tx) =>
          tx._id === transactionId ? { ...tx, status: newStatus } : tx
        ),
      }))
    );
  } catch (error) {
    console.error(error);
    toast.error("Échec de la mise à jour du statut");
  }
};


const handleGenerateCode = async (transactionId) => {
  try {
    const res = await api.post('/admin/generate-code', { transactionId });
    if (res.data.success) {
      toast.success("Code généré avec succès !");
      // Mise à jour locale de la transaction pour afficher le nouveau code
      setAccounts((prevAccounts) =>
        prevAccounts.map((ac) => ({
          ...ac,
          transactions: ac.transactions.map((tx) =>
            tx._id === transactionId
              ? { ...tx, actualCode: { code: res.data.code, isVerified: false } }
              : tx
          ),
        }))
      );
    } else {
      toast.error("Erreur lors de la génération du code");
    }
  } catch (error) {
    console.error(error);
    toast.error("Erreur serveur lors de la génération du code");
  }
};



  return (
    <>
    {isLoading 
    ? (<FullPageLoader title="Recuperation des donnees"/>) 
    : (
        <div className='flex px-1 flex-col space-y-8 items-center py-10 w-full'>
            <h1 className="text-textGreen text-2xl font-playfair font-semibold text-center">Liste des comptes </h1>
            <div className='w-full flex grid grid-cols-1 space-y-10 md:grid-cols-2 gap-8'>
                {accounts && (
                    accounts.map((ac)=>(

                        <Card className="py-4" key={ac.user._id}>
  <CardHeader>
    <CardTitle className="text-2xl text-center font-montserrat text-textGreen">
     <span className='font-medium '>Intitulé du compte : </span>  {`${ac.user.firstname} ${ac.user.surname}`}
    </CardTitle>
  </CardHeader>

  <CardContent>
    <div className="flex flex-col space-y-6 w-full">
      {/* Détails du compte */}
      <div>
        <h4 className="text-xl font-semibold mb-2 text-textGreen font-playfair text-center">Détails du compte</h4>

        <div className="font-robobo text-textGreen text-lg font-medium flex flex-col space-y-2">

          <div><span className="font-semibold">Email:</span> {ac.user?.email}</div>

          <div><span className="font-semibold">Phone:</span> {ac.user?.phone}</div>

          <div><span className="font-semibold">IBAN:</span> {ac.account?.iban}</div>
        <div><span className="font-semibold">Numéro de compte:</span> {ac.account?.accountNumber}</div>
        <div><span className="font-semibold">Solde:</span> {ac.account?.balance} {ac.account?.currency}</div>
        <div><span className="font-semibold">Statut:</span> {ac.account?.statut}</div>
        <div><span className="font-semibold">Plan:</span> {ac.account?.plan}</div>

        </div>
        
      </div>

      {/* Transactions */}
      <div>
        <h4 className="text-lg text-center text-textGreen font-montserrat font-semibold mb-2">Transactions</h4>

        {ac.transactions && ac.transactions.length > 0 ? (
          <div className="space-y-2">
            {ac.transactions.map((tx) => (
              <div
                key={tx._id}
                className="border p-2 rounded-md bg-muted py-5 flex flex-col space-y-4 mb-3"
              >
                <div><span className="font-semibold">Montant:</span> {tx.amount} {ac.account?.currency}</div>
                <div><span className="font-semibold">Type:</span> {tx.type}</div>
                <div><span className="font-semibold">Date:</span> {new Date(tx.createdAt).toLocaleString()}</div>
                <div className='flex flex-row gap-4 font-roboto py-4'>
                    <span className="font-semibold">Payeur:</span>

                    {tx.senderInfos ? (
                        <div className='bg-zinc-50 p-4 flex flex-col space-y-2'>
                            <div><span className='font-medium pr-3'>Iban </span> {tx.senderInfos.iban}</div>
                            <div><span className='font-medium pr-3'>Nom </span> {tx.senderInfos.name}</div>
                        </div>
                    ) : ("Non  défini")}
                </div>

                <div className='flex flex-row gap-4 font-roboto py-4'>
                    <span className="font-semibold font-montserrat">Destinataire:</span>

                    {tx.receiverInfos ? (
                        <div className='bg-zinc-50 p-2 flex flex-col space-y-3'>
                            <div className="font-roboto font-normal "><span className="font-medium pr-3">Iban </span> {tx.receiverInfos?.iban}</div>
                            <div className="font-roboto font-normal "><span className="font-medium pr-3">Nom </span> {tx.receiverInfos.name}</div>
                        </div>
                    ) : ("Non défini")}
                </div>

                                <div className="font-roboto font-normal "><span className="font-medium pr-3">Motif:</span> {tx.motif || "Non specifie"}</div>

                                  <div className="flex flex-row items-center gap-4"><span className="font-roboto font-semibold text-textGreen">Statut:</span> 


                {/* Logique pour changer le statut de la transacton */}
                <Select
  value={tx.status}
  onValueChange={(value) => handleStatusChange(tx._id, value)}
>
  <SelectTrigger className="w-[180px] ">
    <SelectValue placeholder="Changer le statut" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel className={'font-roboto font-semibold '}>Status</SelectLabel>
      <SelectItem value="completed" className={'text-green-700 font-roboto'}>Completed</SelectItem>
      <SelectItem value="in_process" className={'text-blue-700 font-roboto'}>In process</SelectItem>
      <SelectItem value="failed" className={'text-red-700 font-roboto'}>Failed</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>

</div>

{/* Ici , mettre la logique de genertio de cod epar ladmin  */}

{tx.status === "in_process" && (
  <div className="font-roboto text-textGreen flex flex-col space-y-4">

     <div className="">
         Progression : <span>{`${(tx.progress.percent).toFixed(2)} %`}</span>
      </div>
    {/* Affichage du code actuel s'il existe et n'est pas vérifié */}
    {tx.actualCode.code && !tx.actualCode.isVerified ? (
     <div>

       <div className=" p-2 bg-yellow-100 rounded text-yellow-900 font-mono">
        Code actuel : <span>{tx.actualCode.code}</span>
      </div>

     
     </div>
    ) : (
      <div className="mb-2 p-2  italic">Aucun code actuel</div>
    )}

    {/* Bouton pour générer un nouveau code */}
    <button
      className="px-3 py-2 bg-goldButton text-textGreen rounded hover:bg-boldButtonHover font-inter font-semibold transition cursor-pointer"
      onClick={() => handleGenerateCode(tx._id)}
    >
      Générer un code 
    </button>
  </div>
)}


               
              </div>
            ))}


            
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center">Aucune transaction.</p>
        )}
      </div>

      {ac.account?.statut === "active" && (

        <Link href={`/admin/transactions/new?accountId=${ac.account?._id}`} 
   className="py-1 text-center text-textGreen border-2 border-borderGreen rounded-lg text-lg font-inter font-semibold cursor-pointer"
   >Ajouter une transaction
   </Link>

      )}

      
   

      
    </div>
  </CardContent>
</Card>

                        
                    )
                    )
                )}
            </div>


        </div>
    )}
    </>
  )
}

export default accountsPage