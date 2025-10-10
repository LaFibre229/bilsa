'use client'

import React, { useEffect, useState } from 'react';
import api from '@/lib/api/api';
import { toast } from 'sonner';
import {FiAlertTriangle} from 'react-icons/fi'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import FullPageLoader from '@/components/FullPageLoader';
import { useTranslations } from 'next-intl';






const TransactionProgression = ({ transactionId }) => {
  // États locaux
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [codeInput, setCodeInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
   const t = useTranslations("transaction-progress")




  // Fonction pour récupérer la transaction depuis l'API
  async function fetchTransaction() {
    try {
      const res = await api.get(`/transactions/${transactionId}`);
      const data = res.data;
      setTransaction(data.transaction);
      
      // Si un code de poursuite existe et n'est pas vérifié, ouvrir la modale
      if (data.transaction.actualCode?.code && !data.transaction.actualCode?.isVerified) {
        setIsModalOpen(true);
      } else {
        setIsModalOpen(false);
      }

       if (data.transaction.status === 'completed') {
        router.push(`/dashboard`);
      }
    } catch (error) {
      toast.error('Error while fetching transaction details.');
    } finally {
      setLoading(false);
    }
  }

  // useEffect pour charger la transaction au montage et toutes les 5 secondes
  useEffect(() => {
    fetchTransaction(); // premier fetch

    const intervalId = setInterval(fetchTransaction, 5000); // fetch périodique toutes les 5s

    // Nettoyage à la destruction du composant
    return () => clearInterval(intervalId);
  }, [transactionId]);

  // Fonction pour gérer la vérification du code de poursuite
  async function handleVerifyCode() {
    if (!codeInput.trim()) {
      toast.error('The code is required !');
      return;
    }
    setIsVerifying(true);

    try {
      const res = await api.post('/transactions/verify-code', {
        transactionId,
        code: codeInput.trim(),
      });

      if (res.data.success) {
        toast.success('Code validated. Continuing the transaction!');

        // Mettre à jour localement le statut du code (isVerified)
        setTransaction(prev => ({
          ...prev,
          actualCode: {
            ...prev.actualCode,
            isVerified: true,
          },
        }));

        setIsModalOpen(false);
      } else {
        toast.error('Invalid or already used code ');
      }
    } catch (error) {
      toast.error('Oops ! Something went wrong. Please try again');
      console.error(error);
    } finally {
      setIsVerifying(false);
      setCodeInput(''); // Reset input code après tentative
    }
  }

  

  
  if (!transaction) return <div className ='text-4xl text-center text-textGreen font-bold'>Transaction not found</div>;

  // Rendu principal du composant
  return (
    <>

    {loading 
    ? (<FullPageLoader title='Loading ...'/>) 
    : (
      <div className='flex w-full  flex-col items-center'>
      <div className="flex flex-col space-y-5 text-textGreen font-montserrat px-4 md:w-[67%]">

      <div className='flex flex-col py-5 space-y-12 text-textGreen'>

        <h2 className='text-gray-600 text-center text-lg font-roboto p-2 bg-neutral-200 border-none rounded-md font-medium '>Transaction ID : <span className='italic text-gray-300 font-normal'>{transaction._id}</span></h2>

        <div className='flex flex-col space-y-4 w-full border-t border-muted'>
            <div className='flex flex-row items-center justify-between'><span className='font-medium'>{t("transaction_amount")}</span> <span className='font-normal'>{`${transaction.amount} EUR`}</span></div>
          <div className='flex flex-row items-start justify-between my-3'><span className='font-medium'>{t("to")}</span> <div className='font-normal p-3 flex flex-col items-end space-y-2'><span>{transaction.receiverInfos?.iban}</span> <span>{transaction.receiverInfos.name}</span></div></div>
          <div className='flex flex-row items-center justify-between'><span className='font-medium'>{t("status")}</span> <span className='font-normal'>Processing</span></div>
        </div>
      </div>

      <h1 className="text-2xl font-semibold font-bold py-4 text-center">{t("subtiltle")}</h1>

      <div className="flex flex-row items-center gap-3">
        <Progress value={transaction.progress?.percent || 0} />
        <div className="text-right font-roboto font-bold text-xl">
          {(transaction.progress?.percent || 0).toFixed(2)}%
        </div>
      </div>

      <p className='text-xs font-roboto text-center pt-4'>{t("footer")}</p>

      

      {/* Modal pour saisir le code de poursuite */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className = "flex flex-row gap-4 justify-center text-textGreen items-center">
              {/* <div className='flex flex-row gap-6 items-center justify-center text-textGreen font-montserrat font-bold text-lg'> */}
           <FiAlertTriangle  className='text-red-600 w-8 h-8'/>
           {t("dialog.action_needed")}
            {/* </div> */}
              </DialogTitle>
          </DialogHeader>
           <div className='p-3'>
            

            <p className="text-sm font-roboto leading-[1.5] text-textGreen">
            {t("dialog.text_part1")} <span className = "font-semibold">contact@bllsabk.com </span> {t("dialog.text_part2")}
          </p>


           </div>
          

          <Input
            type="text"
            placeholder={t("dialog.placeholder")}
            value={codeInput}
            onChange={e => setCodeInput(e.target.value)}
            disabled={isVerifying}
            
          />

          <DialogFooter>
            <Button onClick={handleVerifyCode} disabled={isVerifying}
             className={'bg-goldButton font-inter font-semibold text-textGreen hover:bg-goldButtonHover hover:text-primary-foreground'}
            >
              {isVerifying ? t("dialog.is_submitting") : t("dialog.verify")}
             
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </div>
    )}
    
    </>
    
  )
};

export default TransactionProgression;
