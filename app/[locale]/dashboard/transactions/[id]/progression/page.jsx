import TransactionProgression from './TransactionProgression';
import Link from 'next/link';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { getTranslations } from 'next-intl/server';
export default async function Page({ params }) {
  const t = getTranslations("transaction-progress")
  const { id } =  await params

  return (
    <>
    <div className='flex flex-col space-y-7 py-6 px-3'>
       <Link href={'/dashboard'}>
               <div className="flex flex-row items-center gap-2 pl-3 pb-7 cursor-pointer font-inter font-semibold text-lg text-textGreen">
                  <FaLongArrowAltLeft />
                  <span className="font-bold">{t("back")}</span>
               </div>
               </Link>
        <TransactionProgression transactionId={id} />
    </div>
    </>
  )
}
