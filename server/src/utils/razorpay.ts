import Razorpay from "razorpay";

let razorpayClient: Razorpay | null = null;

function checkEnv(name: string): string {
  const extractValue = process.env[name];

  if (!extractValue) {
    throw new Error(`Missing env: ${name}`);
  }

  return extractValue;
}

export function getRazorpay() {
  if (!razorpayClient) {
    razorpayClient = new Razorpay({
      key_id: checkEnv("RAZORPAY_KEY_ID"),
      key_secret: checkEnv("RAZORPAY_KEY_SECRET"),
    });
  }

  return razorpayClient;
}

export function toSubUnits(amount: number) {
  return Math.round(amount * 100);
}
