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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Payment</h2>
          <p className="text-red-600 mb-6">{error || "Invalid or expired transaction."}</p>
          <div className="space-y-3">
            <button
              onClick={fetchData}
              className="w-full bg-cyan-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-700 transition"
            >
              <RefreshCw className="w-5 h-5" />
              Retry
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition"
            >
              Go to Home
            </button>
          </div>
        </div>
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Success Icon & Header */}
        <div className="bg-gradient-to-br from-green-400 to-green-600 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-3">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {isFree ? "Subscription Activated! 🎉" : "Payment Successful! 🎉"}
          </h1>
          <p className="text-green-50">
            Your subscription has been activated successfully
          </p>
        </div>

        {/* Transaction Details */}
        <div className="p-6 sm:p-8">
          <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 text-sm">Plan</span>
              <span className="font-semibold text-gray-900">{data.plan || "—"}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-t border-gray-200">
              <span className="text-gray-600 text-sm">Billing Cycle</span>
              <span className="font-semibold text-gray-900 capitalize">
                {derivedBillingCycle ? billingCycleLabelMap[derivedBillingCycle] : "—"}
              </span>
            </div>

            {!isFree && (
              <>
                <div className="flex justify-between items-center py-2 border-t border-gray-200">
                  <span className="text-gray-600 text-sm">Subtotal</span>
                  <span className="font-medium text-gray-900">₹{baseAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-t border-gray-200">
                  <span className="text-gray-600 text-sm">GST (18%)</span>
                  <span className="font-medium text-gray-900">₹{gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-t-2 border-gray-300">
                  <span className="text-gray-900 font-bold">Total Paid</span>
                  <span className="font-bold text-green-600 text-lg">
                    ₹{totalWithGst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </>
            )}

            <div className="flex justify-between items-center py-2 border-t border-gray-200">
              <span className="text-gray-600 text-sm">Next Billing</span>
              <span className="font-medium text-gray-900">
                {data.nextBilling
                  ? new Date(data.nextBilling).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })
                  : "—"}
              </span>
            </div>

            {paymentId && (
              <div className="flex justify-between items-start py-2 border-t border-gray-200">
                <span className="text-gray-600 text-sm">Transaction ID</span>
                <span className="font-mono text-xs text-gray-700 text-right break-all max-w-[60%]">
                  {paymentId}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/tutorials")}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-black py-3.5 rounded-lg flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl font-medium"
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
                className="w-full border-2 border-gray-300 text-gray-700 py-3.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
              >
                <Download className="w-5 h-5" />
                Download Receipt
              </button>
            ) : (
              <div className="text-center py-3">
                <p className="text-sm text-gray-400">Receipt not available</p>
              </div>
            )}

            <button
              onClick={() => navigate("/")}
              className="w-full text-gray-600 py-2 rounded-lg hover:text-gray-900 transition-all font-medium"
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact us at{" "}
            <a href="mailto:support@callifo.com" className="text-cyan-600 hover:underline">
              support@callifo.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}