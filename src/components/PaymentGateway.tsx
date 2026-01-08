import { X, CreditCard, Lock, Calendar, User, Shield, Building } from "lucide-react";
import { useState } from "react";

interface PaymentGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
}

export function PaymentGateway({ isOpen, onClose, selectedPlan }: PaymentGatewayProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const name = e.target.name;

    // Format card number
    if (name === "cardNumber") {
      value = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      if (value.length > 19) return;
    }

    // Format expiry date
    if (name === "expiryDate") {
      value = value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
      if (value.length > 5) return;
    }

    // Format CVV
    if (name === "cvv" && value.length > 3) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment submitted:", formData);
    // Handle payment processing
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-violet-600 to-coral-500 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">Secure Payment</h1>
                <p className="text-gray-600">Your payment information is encrypted and secure</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Method Selection */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-gray-900 mb-4">Payment Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      paymentMethod === "card"
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <span className="text-gray-900">Credit Card</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("bank")}
                    className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      paymentMethod === "bank"
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Building className="w-5 h-5 text-indigo-600" />
                    <span className="text-gray-900">Bank Transfer</span>
                  </button>
                </div>
              </div>

              {/* Card Details */}
              {paymentMethod === "card" && (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
                  <h3 className="text-gray-900">Card Information</h3>

                  {/* Card Number */}
                  <div>
                    <label className="block text-gray-700 mb-2">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                      </div>
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-gray-700 mb-2">Cardholder Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Expiry and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Expiry Date</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-gray-900 mb-4">Billing Address</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Street Address</label>
                        <input
                          type="text"
                          name="billingAddress"
                          value={formData.billingAddress}
                          onChange={handleChange}
                          placeholder="123 Main Street"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-2">City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="San Francisco"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2">ZIP Code</label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            placeholder="94105"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Country</label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          placeholder="United States"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 via-violet-600 to-coral-500 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Lock className="w-5 h-5" />
                    Complete Payment
                  </button>
                </form>
              )}

              {/* Bank Transfer Info */}
              {paymentMethod === "bank" && (
                <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                  <h3 className="text-gray-900">Bank Transfer Details</h3>
                  <p className="text-gray-600">
                    Please use the following bank details to complete your payment:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank Name:</span>
                      <span className="text-gray-900">CallFlow Bank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Number:</span>
                      <span className="text-gray-900">1234567890</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Routing Number:</span>
                      <span className="text-gray-900">987654321</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">SWIFT Code:</span>
                      <span className="text-gray-900">CALLUS33</span>
                    </div>
                  </div>
                  <p className="text-gray-500">
                    Please include your order reference in the payment description.
                  </p>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8 space-y-6">
                <h3 className="text-gray-900">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Plan</span>
                    <span className="capitalize">{selectedPlan}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Billing Cycle</span>
                    <span>Monthly</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Subtotal</span>
                      <span className="text-gray-700">$149.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900 text-2xl">$149.00</span>
                    </div>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="border-t border-gray-200 pt-6 space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span>SSL Encrypted Payment</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Lock className="w-5 h-5 text-green-600" />
                    <span>100% Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span>PCI DSS Compliant</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-500 text-center mb-4">Trusted by 10,000+ businesses</p>
                  <div className="flex justify-center gap-4 opacity-60">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-8" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
