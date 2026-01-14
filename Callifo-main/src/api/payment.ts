import axios from "axios";

import API from "./AxiosInstance";

type BillingCycle = "monthly" | "quarterly" | "yearly";

export const createOrder = async ({
  userId,
  licenseId,
  billingCycle,
  amount,
}: {
  userId: string;
  licenseId: string;
  billingCycle: BillingCycle;
  amount: number; // 👈 ADD THIS
}) => {
  const res = await API.post(`/api/payment/create-order`, {
    userId,
    licenseId,
    billingCycle,
    amount, // 👈 SEND IT
  });
  return res.data;
};

// Verify payment after Razorpay returns handler response
export const verifyPayment = async (details: any) => {
  const res = await API.post(`/api/payment/verify-payment`, details);
  return res.data;
};

export const getTransactionDetails = async (transactionId: string) => {
  const res = await API.get(`/api/payment/transaction/${transactionId}`);
  return res.data;
};

export const downloadInvoice = (transactionId: string) => {
  if (!transactionId) return;

  window.open(
    `https://lisence-system.onrender.com/api/payment/invoice/${transactionId}`,
    "_blank"
  );
};