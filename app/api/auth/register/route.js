// app/api/auth/register/route.js
import { generateAccountNumber } from "@/lib/account/generateAccountNumber";
import { generateIBAN } from "@/lib/account/generateIban";

import Account from "@/lib/models/Account.model";
import { connectDb } from "@/lib/config/dbConnect";
import User from "@/lib/models/User.model";
import { createUserSchema } from "@/lib/schemas/UserSchema";
import { hashPassword } from "@/lib/utils/hashPassword";
import generateToken from "@/lib/utils/generateToken";
import { NextResponse } from "next/server";
import { getMessages } from "next-intl/server";
// @desc  Register a user/set token
// @access Public
// @route POST/api/auth/register

export async function POST(req) {
  await connectDb();
  try {
   const locale = req.headers.get("x-locale") || "en"; 


       // 2️⃣ Charger les messages pour cette locale
    const messages = await getMessages({ locale });

    // 3️⃣ Créer une fonction `t()` locale
    const t = (key) => {
      return key.split('.').reduce((obj, k) => obj?.[k], messages) || key;
    };

    // 4️⃣ Récupérer les données
    const data = await req.json();
    console.log(data)
    // 5️⃣ Valider les données avec le schéma dynamique
    const schema = createUserSchema(t);
    const validData = schema.parse(data); 

   

    if (!validData) {
      return NextResponse.json(
        { message: "Bad request" },
        { status: 400 }
      );
    }

    // 4️⃣ Vérification si l’utilisateur existe déjà
    const existingUser = await User.findOne({ email: validData.email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email déjà utilisé" },
        { status: 400 }
      );
    }

    // 5️⃣ Hash du mot de passe
    const hashedPassword = await hashPassword(data.password);
    const { password, ...rest } = validData;

    // 6️⃣ Création de l’utilisateur
    const user = await User.create({
      ...rest,
      password: hashedPassword,
    });

    // 7️⃣ Création du compte bancaire
    const newAccount = await Account.create({
      userId: user._id,
      iban: generateIBAN(),
      accountNumber: generateAccountNumber(),
      statut: "inactive", // par défaut
      currency: "EUR",
    });

    // 8️⃣ On prépare la réponse JSON
    const response = NextResponse.json(
      {
        message: "Compte créé avec succès",
        token: null, // placeholder, sera remplacé après
        user: {
          id: user._id,
          firstname: user.firstname,
          surname: user.surname,
          email: user.email,
          role: user.role,
        },
        account: newAccount,
      },
      { status: 201 }
    );

    // 9️⃣ Génération + ajout du cookie JWT
    const token = generateToken(user._id, user.role, response);

    // 🔟 Mise à jour de la réponse pour inclure aussi le token côté frontend
    const body = await response.json();
    body.token = token;

    return NextResponse.json(body, {
      status: 201,
      headers: response.headers, // on garde les cookies déjà set
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
