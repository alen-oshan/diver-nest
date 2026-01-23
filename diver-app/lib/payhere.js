import crypto from "crypto";

// Helper function to calculate MD5 and return uppercase
function md5Upper(value) {
  return crypto.createHash("md5").update(value).digest("hex").toUpperCase();
}

export function generatePayHereHash(orderId, amount) {
  const merchantId = process.env.PAYHERE_MERCHANT_ID;
  const merchantSecret = process.env.PAYHERE_SECRET;

  const secretHash = md5Upper(merchantSecret);

  const formattedAmount = Number(amount).toFixed(2); // ensures "30000.00"
  const rawString = merchantId + orderId + formattedAmount + "LKR" + secretHash;
  const hash = md5Upper(rawString);


  return hash;
}
