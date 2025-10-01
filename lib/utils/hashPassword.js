import bcrypt from "bcryptjs";

// Hasher le mot de passe
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); 
  return await bcrypt.hash(password, salt);
};

// Vérifier le mot de passe lors du login
export const comparePassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};
