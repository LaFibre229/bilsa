// Fonction pour générer un code alphanumérique de 8 caractères (chiffres + lettres majuscules)
export function generateProgressCode(length = 8) {
  const chars = "ABCDEFGH0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}