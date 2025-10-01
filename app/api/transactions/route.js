// app/api/transactions/create/route.js
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/config/dbConnect";
import Account from "@/lib/models/Account.model";
import Transaction from "@/lib/models/Transaction.model";
import { verifyAdmin } from "@/lib/utils/verifyAdmin";
import User from "@/lib/models/User.model";
import { verifyToken } from "@/lib/utils/verifyToken";
import { sendEmail } from "@/lib/account/sendmail";
export async function POST(req) {
  await connectDb();
  try {
    
  
   const token = verifyToken(req);
    const user =  await User.findById(token.userId)

    const body = await req.json()
    const {accountId, type, amount, senderInfos, receiverInfos, motif, status } = body;
     
    // Vérification des champs requis
    if (!accountId || !type || !amount) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

//     if (type === "deposit" && user.role !== "admin") {
//   return NextResponse.json(
//     { message: "Seuls les administrateurs peuvent effectuer un dépôt." },
//     { status: 403 }
//   );
// }

    // Vérifier si le compte existe
    const account = await Account.findById(accountId);
    if (!account) {
      return NextResponse.json(
        { message: "Unauthorized - Account not found" },
        { status: 401 }
      );
    }

    const accountOwner = await User.findById(account.userId)


    // Vérifier si le compte est actif
    if (account.statut !== "active") {
      return NextResponse.json(
        { message: "Account is not active. Please verify your account first." },
        { status: 403 }
      );
    }

    // Création de la transaction
    const transaction = new Transaction({
      accountId,
      type,
      amount,
      senderInfos: senderInfos || null,
      receiverInfos: receiverInfos || null,
      motif: motif || "",
      status: status || "in_process", 
    });

    const parsedAmount = parseFloat(amount);

    // Logique de mise à jour du solde
if (type === "deposit") {
  account.balance += parsedAmount;
  // Envoyer l'e-mail
  if(accountOwner){

     await sendEmail({
           to: accountOwner.email,
           subject: "Incoming transfer on your Bilsa Account",
           text: `
             ${accountOwner.surname} , ${parsedAmount} ${account.currency} has been added to your Bilsa account  from ${senderInfos.name || "your peers"}. Check your account for an overview.
             
           `
         });
    
  }
        
} else if (type === "transfer") {
  if (account.balance < parsedAmount) {
    return NextResponse.json(
      { message: "Solde insuffisant pour effectuer cette transaction." },
      { status: 400 }
    );
  }
  account.balance -= parsedAmount;
  // Envoyer l'e-mail
  if(accountOwner){

     await sendEmail({
           to: accountOwner.email,
           subject: "Outgoing transfer on your Bilsa Account",
           text: `
             ${accountOwner.surname} , ${parsedAmount} ${account.currency} has been transferred from your Bilsa account to  ${receiverInfos.name || "your peers"}. Check your account for an overview.
             
           `
         });
}

  }
        

    await transaction.save();
    await account.save();
       
    return NextResponse.json(
      { message: "Transaction created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { message: "Error creating transaction", error: error.message },
      { status: 500 }
    );
  }
}



