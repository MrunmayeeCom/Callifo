import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, ArrowRight, Download, RefreshCw } from "lucide-react";
import { getTransactionDetails } from "../api/payment";

export function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("tx");

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isFree = searchParams.get("free") === "true";

  const DASHBOARD_URL = "https://admin-callifo.onrender.com";


  const fetchData = async () => {


    if (isFree) {
    setData({
      plan: "Free / Trial Plan",
      amount: 0,
      nextBilling: null,
    });
    setLoading(false);
    return;
  }
    if (!transactionId) {
      setError("No transaction ID provided.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await getTransactionDetails(transactionId);
      setData(res.data ?? res);
    } catch (err: any) {
      console.error("Failed to load transaction", err);
      setError(
        err?.response?.data?.message ||
          "Failed to load transaction. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [transactionId]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white">
        Loading payment details...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-red-400 gap-4">
        <p>{error || "Invalid or expired transaction."}</p>
        <button
          onClick={fetchData}
          className="bg-white text-indigo-700 py-2 px-4 rounded-xl flex items-center gap-2 hover:bg-gray-100 transition"
        >
          <RefreshCw className="w-5 h-5" />
          Retry
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const billingCycleLabelMap: Record<string, string> = {
    month: "Monthly",
    quarter: "Quarterly",
    year: "Yearly",
  };

  const deriveBillingCycle = () => {
    if (!data?.nextBilling) return null;

    const now = new Date();
    const next = new Date(data.nextBilling);

    const diffDays = Math.round(
      (next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays <= 32) return "month";
    if (diffDays <= 95) return "quarter";
    if (diffDays <= 370) return "year";

    return null;
  };

  const derivedBillingCycle = deriveBillingCycle();

  const GST_RATE = 0.18;

const baseAmount = Number(data.amount) || 0;
const gstAmount = Math.round(baseAmount * GST_RATE * 100) / 100;
const totalWithGst = Math.round((baseAmount + gstAmount) * 100) / 100;

  
  // Try multiple possible field names for payment ID
  const paymentId =
    data.id ||
    data.paymentId ||
    data.razorpayPaymentId ||
    data.transactionId ||
    data.payment_id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-500 rounded-full p-4">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isFree ? "Subscription Activated 🎉" : "Payment Successful 🎉"}
        </h1>

        <p className="text-gray-600 mb-6">
          Your subscription has been activated successfully.
        </p>

        


        {/* Transaction Details */}
        <div className="border rounded-xl p-4 text-left space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-500">Plan</span>
            <span className="font-medium">{data.plan || "—"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Billing Cycle</span>
            <span className="font-medium capitalize">
              {derivedBillingCycle ? billingCycleLabelMap[derivedBillingCycle] : "—"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium">₹ {baseAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">GST (18%)</span>
            <span className="font-medium">₹ {gstAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between border-t pt-2">
            <span className="text-gray-700 font-semibold">Total Paid</span>
            <span className="font-semibold text-gray-900">
              ₹ {totalWithGst.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Next Billing</span>
            <span className="font-medium">
              {data.nextBilling
                ? new Date(data.nextBilling).toLocaleDateString()
                : "—"}
            </span>
          </div>

          {/* Show Payment ID if available (for debugging) */}
          {paymentId && (
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-medium text-xs">{paymentId}</span>
            </div>
          )}
        </div>

      
          {/* Buttons */}
{/* Action Buttons */}
<div className="space-y-3">
  <button
    onClick={() => navigate("/tutorials")}
    className="w-full bg-green-600 text-black py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-green-700 transition"
  >
    Go to Tutorial
    <ArrowRight className="w-5 h-5" />
  </button>

  {paymentId ? (
    <button
      onClick={() =>
        window.open(
          `https://lisence-system.onrender.com/api/payment/invoice/${transactionId}`,
          "_blank"
        )
      }
      className="w-full border border-gray-300 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition"
    >
      <Download className="w-5 h-5" />
      Download Receipt
    </button>
  ) : (
    <p className="text-sm text-gray-400 text-center">
      Receipt not available
    </p>
  )}
</div>

      </div>
    </div>
  );
}