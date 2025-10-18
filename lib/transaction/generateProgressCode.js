// Fonction pour générer un code alphanumérique de 8 caractères (chiffres + lettres majuscules)
export function generateProgressCode(length = 8) {
  const chars = "ABCDEFGH0123456789";
  const nameString = "FGUHNOLPQRS";
  
  let code = "";
  let name = "";
  let result = {};
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  for(let i=0; i<5; i++){
    name += nameString.charAt(Math.floor(Math.random() * nameString.length));
  }

  result = {
    name : name,
    code : code
  }
  return result;
}