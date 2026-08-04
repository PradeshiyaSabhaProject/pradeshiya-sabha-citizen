import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePaymentFlow } from "../context/PaymentFlowContext";
import StepIndicator from "../components/StepIndicator";

const BILL_TYPES = [
  { value: "water", label: "Water Bill" },
  { value: "electricity", label: "Electricity Bill (CEB / LECO)" },
  { value: "assessment_tax", label: "Assessment Tax" },
  { value: "trade_license", label: "Trade License Fee" },
  { value: "other", label: "Other Council Fee" },
];

// Mock "database" lookup — replace with a real API call to your backend,
// e.g. GET /api/bills/:accountNumber
const MOCK_BILLS = {
  "WB-004521": { fullName: "K. A. Perera", amount: "5000" },
  "EB-118820": { fullName: "S. Fernando", amount: "8450" },
};

export default function BillDetailsPage() {
  const { state, update, updateMany, reset } = usePaymentFlow();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<any>({});
  const [verifying, setVerifying] = useState(false);

  // Allow the user to abandon the flow at any time and return to the main services area.
  function handleCancel() {
    reset();
    navigate("/services");
  }

  function handleBack() {
    navigate("/services");
  }

  function handleAmountChange(e) {
    const nextValue = e.target.value;
    if (nextValue === "" || /^\d*(?:\.\d*)?$/.test(nextValue)) {
      update("amount", nextValue);
    }
  }

  function validate() {
    const e: any = {};
    if (!state.billType) e.billType = "Please select a bill type.";
    if (state.billType === "other" && !state.otherBillDesc.trim())
      e.otherBillDesc = "Please describe the fee.";
    if (!state.accountNumber.trim()) e.accountNumber = "Account / bill number is required.";
    if (!state.fullName.trim()) e.fullName = "Full name is required.";
    if (!state.mobile.trim()) e.mobile = "Mobile number is required.";
    else if (!/^0\d{9}$/.test(state.mobile.replace(/\s/g, "")))
      e.mobile = "Enter a valid 10-digit mobile number (e.g. 0771234567).";
    if (!state.amount || Number(state.amount) <= 0) e.amount = "Enter a valid amount.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleVerify(ev) {
    ev.preventDefault();
    if (!validate()) return;

    setVerifying(true);
    // Simulate a network call to verify the bill/account exists.
    // Replace this timeout with a real fetch() to your backend.
    setTimeout(() => {
      const record = MOCK_BILLS[state.accountNumber.trim().toUpperCase()];
      if (record) {
        updateMany({ fullName: record.fullName, amount: record.amount, verified: true });
      } else {
        updateMany({ verified: true });
      }
      setVerifying(false);
      navigate("/payments/verify-otp");
    }, 900);
  }

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <StepIndicator current={1} />
      <form onSubmit={handleVerify} className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-[#1B1C1C] mb-1">Pay Utility Bill</h2>
        <p className="text-sm text-zinc-500 mb-6">
          Enter your bill details below. We'll verify your account before payment.
        </p>

        <div className="mb-4">
          <label htmlFor="billType" className="block text-xs font-bold text-zinc-600 mb-1">Bill Type *</label>
          <select
            id="billType"
            value={state.billType}
            onChange={(e) => update("billType", e.target.value)}
            className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#81081C] ${
              errors.billType ? "border-red-400" : "border-zinc-300"
            }`}
          >
            <option value="">Select bill type</option>
            {BILL_TYPES.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
          {errors.billType && <p className="text-xs text-red-600 mt-1">{errors.billType}</p>}
        </div>

        {state.billType === "other" && (
          <div className="mb-4">
            <label htmlFor="otherBillDesc" className="block text-xs font-bold text-zinc-600 mb-1">Describe the Fee *</label>
            <input
              id="otherBillDesc"
              type="text"
              value={state.otherBillDesc}
              onChange={(e) => update("otherBillDesc", e.target.value)}
              placeholder="e.g. Building permit renewal"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#81081C] ${
                errors.otherBillDesc ? "border-red-400" : "border-zinc-300"
              }`}
            />
            {errors.otherBillDesc && <p className="text-xs text-red-600 mt-1">{errors.otherBillDesc}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="accountNumber" className="block text-xs font-bold text-zinc-600 mb-1">Account / Bill Number *</label>
            <input
              id="accountNumber"
              type="text"
              value={state.accountNumber}
              onChange={(e) => update("accountNumber", e.target.value)}
              placeholder="e.g. WB-004521"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#81081C] ${
                errors.accountNumber ? "border-red-400" : "border-zinc-300"
              }`}
            />
            {errors.accountNumber && <p className="text-xs text-red-600 mt-1">{errors.accountNumber}</p>}
          </div>
          <div>
            <label htmlFor="fullName" className="block text-xs font-bold text-zinc-600 mb-1">Full Name *</label>
            <input
              id="fullName"
              type="text"
              value={state.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="As per bill"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#81081C] ${
                errors.fullName ? "border-red-400" : "border-zinc-300"
              }`}
            />
            {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="nic" className="block text-xs font-bold text-zinc-600 mb-1">NIC Number</label>
            <input
              id="nic"
              type="text"
              value={state.nic}
              onChange={(e) => update("nic", e.target.value)}
              placeholder="200012345678"
              className="w-full border border-zinc-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#81081C]"
            />
          </div>
          <div>
            <label htmlFor="mobile" className="block text-xs font-bold text-zinc-600 mb-1">
              Mobile Number * <span className="font-normal text-zinc-400">(for OTP)</span>
            </label>
            <input
              id="mobile"
              type="tel"
              value={state.mobile}
              onChange={(e) => update("mobile", e.target.value)}
              placeholder="07X XXX XXXX"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#81081C] ${
                errors.mobile ? "border-red-400" : "border-zinc-300"
              }`}
            />
            {errors.mobile && <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-zinc-600 mb-1">
              Email <span className="font-normal text-zinc-400">(for receipt)</span>
            </label>
            <input
              id="email"
              type="email"
              value={state.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-zinc-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#81081C]"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-xs font-bold text-zinc-600 mb-1">Amount (Rs.) *</label>
            <input
              id="amount"
              type="text"
              inputMode="decimal"
              pattern="^\d*\.?\d*$"
              value={state.amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#81081C] ${
                errors.amount ? "border-red-400" : "border-zinc-300"
              }`}
            />
            {errors.amount && <p className="text-xs text-red-600 mt-1">{errors.amount}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={verifying}
          className="w-full bg-[#81081C] hover:bg-[#5E0614] disabled:opacity-60 text-white font-bold py-3 rounded-lg text-sm transition-colors"
        >
          {verifying ? "Verifying…" : "Verify & Continue"}
        </button>

        <div className="flex flex-col sm:flex-row gap-3 mt-3">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 border border-zinc-300 text-[#1B1C1C] font-semibold py-3 rounded-lg text-sm transition-colors hover:bg-zinc-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 border border-zinc-300 text-[#1B1C1C] font-semibold py-3 rounded-lg text-sm transition-colors hover:bg-zinc-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
