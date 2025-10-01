// app/api/dev/create-admin/route.js

import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/utils/hashPassword";
import User from "@/lib/models/User.model";
import { connectDb } from "@/lib/config/dbConnect"; // ou ton util db

export async function POST() {
  try {
    await connectDb();

    // Empêche les doublons
    const existingAdmin = await User.findOne({ email: "adminbilsa@bank.com" });
    if (existingAdmin) {
      return NextResponse.json({ message: "Admin already exists" }, { status: 400 });
    }

    const hashed = await hashPassword("admin123");

    const admin = await User.create({
      firstname: "Super",
      surname: "Admin",
      email: "adminbilsa@bank.com",
      adress : "lord",
      birthdate : "01.10.2000",
      dateresidence : "11.2009",
      birthplace : "Paris",
      birthcountry : "France",
      nationality : "French",
      postalcode : "1233444",
      street : "Rue de rivio",
      profession : "Maison",
      phone : "+33476987656789",
      password: hashed,
      role: "admin",
    });

    return NextResponse.json({
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create admin", error: error.message },
      { status: 500 }
    );
  }
}
