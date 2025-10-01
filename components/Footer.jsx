import React from 'react'
import Link from 'next/link'
// import {FaFacebookF,FaInstagram, FaLinkedin} from 'react-icons/fa'
// import {FaXTwitter} from 'react-icons/fa6'


const legalLinks =[
    {
        title : "Terms and conditions",
        url : "/#"
    },
    {
        title : "Legal Notices",
        url : "/#"
    },
    {
        title : "Consent setting",
        url : "/#"
    },
    {
        title : "Group",
        url : "/#"
    },
    
    
    
]



const contactLinks =[
    {
        title : "Email",
        url : "/#"
    },
    {
        title : "WhatsApp",
        url : "/#"
    },
]



// const helpLinks =[
//     {
//         title : "Payments",
//         url : "/#"
//     },
//     {
//         title : "Account",
//         url : "/#"
//     },
//     {
//         title : "Card",
//         url : "/#"
//     },
//     {
//         title : "Commissions",
//         url : "/#"
//     },
//     {
//         title : "Recharges",
//         url : "/#"
//     },
//     {
//         title : "Cryptocurrencies",
//         url : "/#"
//     },
// ]




const Footer = () => {
  return (
    <footer className='bg-textGreen text-primary-foreground' >
      <div className='px-3 pt-20 flex flex-col md:flex-row md:px-25 md:items-start md:justify-between md:pb-10'>
            <div className='flex flex-col space-y-10 pb-5'>
                <div className='flex items-center gap-4 font-playfair font-extrabold text-5xl'>
                    BILSA
                    
                    </div>
                <p className={` text-xl font-montserrat font-medium`}>The bank that fits in your pocket </p>
                {/* <div className='flex  w-30 justify-between items-center space-x-4'>
                    <span className='text-xl text-gray-900 bg-cyan-50 p-1 rounded-full'><Link href='/#'><FaFacebookF /></Link></span>
                    <span className='text-xl'><Link href='/#'><FaXTwitter /></Link></span>
                    <span className='text-xl'><Link href='/#'><FaInstagram /></Link></span>
                    <span className='text-xl p-1 rounded-full'><Link href='/#'><FaLinkedin /></Link></span>
                </div> */}

            </div>
             <div className='py-5 font-montserrat'>
                    <h2 className='font-semibold text-xl pb-2'><Link href={'/#'}>Legal</Link></h2>
                    <div className='flex flex-col space-y-4 items-start'>
                {legalLinks.map((l, index)=>(
                    <Link className='text-lg' key={index} href={`${l.url}` }>{l.title}</Link>
                   ))}
                    </div>
                  
                </div>

                <div className='py-5 font-montserrat'>
                    <h2 className='font-semibold text-xl pb-2'><Link href='/#'>Contact</Link></h2>
                    <div className='flex flex-col space-y-4 items-start'>
                          {contactLinks.map((l, index)=>(
                    <Link  className='text-lg' key={index} href={`${l.url}`}>{l.title}</Link>
                   ))}
                    </div>
                    
                </div>

                {/* <div className='py-5'>
                    <h2 className='font-semibold text-xl pb-2'><Link href='/#'>Help</Link></h2>
                    <div className='flex flex-col space-y-4 items-start'>
                                            {helpLinks.map((l, index)=>(
                    <Link className='text-lg' key={index} href={`${l.url}`}>{l.title}</Link>
                   ))}
                    </div>

                </div> */}
      </div>
      <hr className='border-b border-darkGrayishBlue m-none'/>
      <div className='pt-15 pb-24 md:px-25'>

        <p className='px-3 text-justify font-roboto leading-[1.5] text-lg'>BILSA is a simplify join stock company registered in the Nice Trade and Companies Register with a capital of 4.450.000 euros
          More than a bank, it's a digital experience: open an account in minutes, manage it in real time, enjoy reduced fees, and enjoy total freedom from your smartphone. Transparent, fast, and 100% connected, it gives you control over your finances like no other.
        </p>

      </div>

    </footer>
  )
}

export default Footer