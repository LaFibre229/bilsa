import mongoose from "mongoose";

// On met la connexion en cache (évite de rouvrir plusieurs connexions en dev)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDb() {
  const MONGO_URL = process.env.MONGO_URL;

  if (!MONGO_URL) {
    throw new Error("❌ MONGO_URL manquant dans .env.local");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL, {
      dbName: "monprojet",
    }).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    console.log("🚀 MongoDB connecté");
  } catch (e) {
    cached.promise = null;
    console.error("❌ Erreur MongoDB :", e);
    throw e;
  }

  return cached.conn;
}
