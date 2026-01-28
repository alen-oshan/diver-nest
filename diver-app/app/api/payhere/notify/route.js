import crypto from "crypto";

export async function POST(req) {
  const data = await req.formData();
  console.log(data)

  const payload = {};
  for (const [key, value] of data.entries()) {
    payload[key] = value;
  }

  console.log("PayHere Notify Payload:", payload);

  return new Response("OK", { status: 200 });
}


  // const receivedHash = data.get("md5sig");

  // const localHash = crypto
  //   .createHash("md5")
  //   .update(
  //     process.env.PAYHERE_MERCHANT_ID +
  //       data.get("order_id") +
  //       data.get("payhere_amount") +
  //       data.get("payhere_currency") +
  //       data.get("status_code") +
  //       crypto
  //         .createHash("md5")
  //         .update(process.env.PAYHERE_SECRET)
  //         .digest("hex")
  //         .toUpperCase()
  //   )
  //   .digest("hex")
  //   .toUpperCase();

  // if (receivedHash === localHash && data.get("status_code") === "2") {
  //   // PAYMENT SUCCESS
  //   // Update order in DB
  // }


