export function generateIBAN() {
  const countryCode = "DE"; // ou "DE", "BE", etc.
  const checkDigits = Math.floor(10 + Math.random() * 89); // 2 digits
  const bankCode = "1203"; 
  const branchCode = "0000"; 
  const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000); // 10 digits
  const key = Math.floor(10 + Math.random() * 89); // 2 digits

  return `${countryCode}${checkDigits} ${bankCode} ${branchCode} ${accountNumber} ${key}`;
}