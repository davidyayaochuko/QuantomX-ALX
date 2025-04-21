import React, { useState } from "react";

const PaymentPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [workspace, setWorkspace] = useState("Private Office");
  const [amount, setAmount] = useState(5000); // amount in NGN

  // Calculate price breakdown
  const basePrice = amount;
  const serviceFee = Math.round(amount * 0.05); // 5% service fee
  const totalAmount = basePrice + serviceFee;

  const handlePayment = (e) => {
    e.preventDefault();

    // Simulate Paystack
    alert(`Redirecting to payment gateway for ₦${totalAmount}...`);
    // Integration: use Paystack/Flutterwave SDK here.
  };

  const workspaceOptions = [
    { value: "Private Office", label: "Private Office", price: 5000 },
    { value: "Hot Desk", label: "Hot Desk", price: 2500 },
    { value: "Meeting Room", label: "Meeting Room", price: 7500 },
    { value: "Dedicated Desk", label: "Dedicated Desk", price: 4000 },
  ];

  const handleWorkspaceChange = (e) => {
    const selected = e.target.value;
    setWorkspace(selected);
    
    // Update amount based on selected workspace
    const option = workspaceOptions.find(opt => opt.value === selected);
    if (option) {
      setAmount(option.price);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl grid md:grid-cols-5 gap-6">
        {/* Left panel - Form */}
        <div className="md:col-span-3 bg-white p-8 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">
            Complete Your Booking
          </h1>
          <p className="text-gray-600 mb-8">
            Enter your details below to secure your workspace
          </p>

          <form onSubmit={handlePayment} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Workspace Type</label>
              <select
                value={workspace}
                onChange={handleWorkspaceChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white transition-all"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                  backgroundPosition: "right 0.5rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem"
                }}
              >
                {workspaceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} (₦{option.price.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Custom Amount (Optional)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  min={500}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Adjust if you have a special arrangement</p>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center"
            >
              <span>Proceed to Payment</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>

        {/* Right panel - Summary */}
        <div className="md:col-span-2 bg-indigo-50 p-8 rounded-2xl shadow-lg self-start sticky top-8">
          <h2 className="text-xl font-bold text-indigo-800 mb-6">Booking Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between pb-4 border-b border-indigo-100">
              <span className="text-gray-600">Workspace</span>
              <span className="font-medium">{workspace}</span>
            </div>
            
            <div className="flex justify-between pb-4 border-b border-indigo-100">
              <span className="text-gray-600">Duration</span>
              <span className="font-medium">1 Month</span>
            </div>
            
            <div className="flex justify-between pb-4 border-b border-indigo-100">
              <span className="text-gray-600">Base Price</span>
              <span className="font-medium">₦{basePrice.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between pb-4 border-b border-indigo-100">
              <span className="text-gray-600">Service Fee</span>
              <span className="font-medium">₦{serviceFee.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-xl font-bold text-indigo-700">₦{totalAmount.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-8 bg-white p-4 rounded-xl border border-indigo-100">
            <div className="flex items-start">
              <div className="bg-indigo-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Secure Payment</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Your payment is protected with bank-level encryption and security
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-8 space-x-3">
            <img src="/api/placeholder/40/25" alt="Visa" className="h-6" />
            <img src="/api/placeholder/40/25" alt="Mastercard" className="h-6" />
            <img src="/api/placeholder/40/25" alt="Paystack" className="h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;