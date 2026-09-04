import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePaymentFlow } from "../context/PaymentFlowContext";
import StepIndicator from "../components/StepIndicator";

// Banks integrated with GovPay, Sri Lanka's official government
// digital payment platform (run by ICTA + LankaPay).
const GOVPAY_BANKS = [
  "Bank of Ceylon (BOC)",
  "People's Bank",
  "Commercial Bank",
  "Hatton National Bank (HNB)",
  "Sampath Bank",
  "Seylan Bank",
  "DFCC Bank",
  "NDB Bank",
  "NTB Bank",
  "Pan Asia Bank (PABC)",
  "National Savings Bank (NSB)",
  "Amana Bank",
  "Cargills Bank",
];

// Fintech apps GovPay has named as onboarding partners. This list
// changes over time — confirm the current roster on govpay.lk before
// shipping, and keep the "Other" fallback either way.
const GOVPAY_FINTECH = ["iPay", "HelaPay", "Other Fintech App (shown on GovPay)"];

/**
 * Generates a mock payment reference code using the current timestamp.
 * @returns Formatted reference string starting with 'HPS-PAY-'
 */
function generateReference() {
  const ts = Date.now().toString().slice(-8);
  return `HPS-PAY-${ts}`;
}

/**
 * Formats a number or string into a Sri Lankan Rupee currency string formatted to 2 decimal places.
 * @param value Raw numeric or string amount
 * @returns Formatted currency string (e.g. "2,450.00")
 */
function formatAmount(value) {
  const amount = Number(value || 0);
  return amount.toLocaleString("en-LK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Maps a bill category key to its human-readable title label.
 * @param type Category key string
 * @returns Descriptive label string for the bill type
 */
function billTypeLabel(type) {
  switch (type) {
    case "water":
      return "Water Bill";
    case "electricity":
      return "Electricity Bill (CEB / LECO)";
    case "assessment_tax":
      return "Assessment Tax";
    case "trade_license":
      return "Trade License Fee";
    default:
      return "Council Fee";
  }
}

/**
 * Renders Step 3 of the payment flow for selecting and filling payment gateway credentials.
 */
export default function PaymentMethodPage() {
  const { state, update, updateMany, reset } = usePaymentFlow();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<any>({});
  const [processing, setProcessing] = useState(false);
  const [govChannelType, setGovChannelType] = useState("bank");

  /** Guards access to step 3, redirecting back to OTP verification if unverified */
  useEffect(() => {
    if (!state.otpVerified) {
      navigate("/payments/verify-otp", { replace: true });
    }
  }, [state.otpVerified, navigate]);

  /**
   * Navigates back to Step 2 for OTP verification.
   */
  function handleBack() {
    navigate("/payments/verify-otp");
  }

  /**
   * Clears the payment flow state and exits to the main services page.
   */
  function handleCancel() {
    reset();
    navigate("/services");
  }

  /**
   * Validates required form inputs based on the active payment method choice.
   * @returns True if payment inputs are valid, false if validation errors exist
   */
  function validate() {
    const e: any = {};
    if (!state.method) e.method = "Select a payment method.";
    if (state.method === "govpay" && !state.govBank) e.govBank = "Select your bank / fintech app.";
    if (state.method === "card" && (!state.cardNumber || !state.cardExpiry || !state.cardCvv))
      e.cardNumber = "Enter complete card details.";
    if (state.method === "bank" && !state.bankAccountRef.trim())
      e.bankAccountRef = "Enter your bank account reference.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  /**
   * Handles payment submission, simulates gateway processing delay, records reference details, and advances to receipt page.
   * @param ev Form submission event
   */
  function handlePay(ev) {
    ev.preventDefault();
    if (!validate()) return;

    setProcessing(true);
    // Simulate handoff to GovPay / card processor / bank.
    // In production: redirect to GovPay with a signed payload, or call
    // your PSP's card API, then confirm via the server-side webhook —
    // never mark a payment as successful from the client alone.
    setTimeout(() => {
      updateMany({ referenceNumber: generateReference(), paidAt: new Date().toISOString() });
      setProcessing(false);
      navigate("/payments/success");
    }, 1400);
  }

  const billLabel = state.billType === "other" ? state.otherBillDesc : billTypeLabel(state.billType);

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <StepIndicator current={3} />

      <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-[#1B1C1C] mb-1">Choose Payment Method</h2>
        <p className="text-sm text-zinc-500 mb-6">
          Paying Rs. {formatAmount(state.amount)} for {billLabel} — Account{" "}
          {state.accountNumber}.
        </p>

        <form onSubmit={handlePay}>
          <div className="flex flex-col gap-2 mb-4">
            <PaymentOption
              selected={state.method === "govpay"}
              onClick={() => update("method", "govpay")}
              icon="🏛"
              title="GovPay"
              subtitle="Sri Lanka's official government payment platform"
            />
            <PaymentOption
              selected={state.method === "card"}
              onClick={() => update("method", "card")}
              icon="💳"
              title="Debit / Credit Card"
              subtitle="Visa, MasterCard"
            />
            <PaymentOption
              selected={state.method === "bank"}
              onClick={() => update("method", "bank")}
              icon="🏦"
              title="Online Bank Transfer"
              subtitle="Direct transfer from your bank account"
            />
          </div>
          {errors.method && <p className="text-xs text-red-600 mb-4">{errors.method}</p>}

          {state.method === "govpay" && (
            <div className="mb-6 border border-zinc-200 rounded-lg p-4 bg-zinc-50">
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setGovChannelType("bank");
                    update("govBank", "");
                  }}
                  className={`flex-1 text-xs font-bold py-2 rounded-md ${
                    govChannelType === "bank"
                      ? "bg-[#81081C] text-white"
                      : "bg-white border border-zinc-300 text-zinc-600"
                  }`}
                >
                  Bank
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setGovChannelType("fintech");
                    update("govBank", "");
                  }}
                  className={`flex-1 text-xs font-bold py-2 rounded-md ${
                    govChannelType === "fintech"
                      ? "bg-[#81081C] text-white"
                      : "bg-white border border-zinc-300 text-zinc-600"
                  }`}
                >
                  Fintech App
                </button>
              </div>

              <label className="block text-xs font-bold text-zinc-600 mb-1">
                Select {govChannelType === "bank" ? "Your Bank" : "Fintech App"} *
              </label>
              <select
                value={state.govBank}
                onChange={(e) => update("govBank", e.target.value)}
                className={`w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#81081C] ${
                  errors.govBank ? "border-red-400" : "border-zinc-300"
                }`}
              >
                <option value="">Select an option</option>
                {(govChannelType === "bank" ? GOVPAY_BANKS : GOVPAY_FINTECH).map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              {errors.govBank && <p className="text-xs text-red-600 mt-1">{errors.govBank}</p>}
              <p className="text-xs text-zinc-400 mt-2">
                You'll be redirected to GovPay to complete payment through your selected{" "}
                {govChannelType === "bank" ? "bank" : "app"}.
              </p>
            </div>
          )}

          {state.method === "card" && (
            <div className="mb-6 flex flex-col gap-3">
              <input
                type="text"
                value={state.cardNumber}
                onChange={(e) => update("cardNumber", e.target.value)}
                placeholder="Card Number"
                maxLength={19}
                className="w-full border border-zinc-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#81081C]"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={state.cardExpiry}
                  onChange={(e) => update("cardExpiry", e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full border border-zinc-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#81081C]"
                />
                <input
                  type="text"
                  value={state.cardCvv}
                  onChange={(e) => update("cardCvv", e.target.value)}
                  placeholder="CVV"
                  maxLength={3}
                  className="w-full border border-zinc-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#81081C]"
                />
              </div>
              {errors.cardNumber && <p className="text-xs text-red-600 mt-1">{errors.cardNumber}</p>}
            </div>
          )}

          {state.method === "bank" && (
            <div className="mb-6">
              <label className="block text-xs font-bold text-zinc-600 mb-1">Bank Account Reference *</label>
              <input
                type="text"
                value={state.bankAccountRef}
                onChange={(e) => update("bankAccountRef", e.target.value)}
                placeholder="Your bank account number"
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#81081C] ${
                  errors.bankAccountRef ? "border-red-400" : "border-zinc-300"
                }`}
              />
              {errors.bankAccountRef && <p className="text-xs text-red-600 mt-1">{errors.bankAccountRef}</p>}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
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
          <button
            type="submit"
            disabled={processing}
            className="w-full mt-3 bg-[#81081C] hover:bg-[#5E0614] disabled:opacity-60 text-white font-bold py-3 rounded-lg text-sm transition-colors"
          >
            {processing ? "Processing…" : `Pay Rs. ${formatAmount(state.amount)}`}
          </button>
          <p className="text-center text-xs text-zinc-400 mt-3">🔒 Your payment is processed securely.</p>
        </form>
      </div>
    </div>
  );
}

/**
 * Renders an interactive payment option choice card.
 * @param selected Whether option is currently selected
 * @param onClick Selection callback handler
 * @param icon Icon or emoji display element
 * @param title Primary payment option title
 * @param subtitle Option detail description
 */
function PaymentOption({ selected, onClick, icon, title, subtitle }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 border rounded-lg px-4 py-3 text-left transition-colors ${
        selected ? "border-[#81081C] bg-[#FCEEF0]" : "border-zinc-300 hover:border-zinc-400"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span>
        <span className="block text-sm font-semibold text-[#1B1C1C]">{title}</span>
        <span className="block text-xs text-zinc-500">{subtitle}</span>
      </span>
    </button>
  );
}
