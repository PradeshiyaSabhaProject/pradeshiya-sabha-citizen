import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePaymentFlow } from "../context/PaymentFlowContext";
import StepIndicator from "../components/StepIndicator";

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

export default function PaymentSuccessPage() {
  const { state, reset } = usePaymentFlow();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.referenceNumber) {
      navigate("/payments", { replace: true });
    }
  }, [state.referenceNumber, navigate]);

  const billLabel = state.billType === "other" ? state.otherBillDesc : billTypeLabel(state.billType);
  const paidDate = state.paidAt ? new Date(state.paidAt) : new Date();

  function handleDone() {
    reset();
    navigate("/payments");
  }

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <StepIndicator current={4} />

      <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-2xl mx-auto mb-4">
            ✓
          </div>
          <h2 className="text-lg font-bold text-[#1B1C1C] mb-1">Payment Successful</h2>
          <p className="text-sm text-zinc-500">
            Your payment has been received and a receipt has been generated below.
          </p>
        </div>

        <div className="border border-dashed border-zinc-300 rounded-lg p-5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-[#1B1C1C]">Homagama Pradeshiya Sabha</span>
            <span className="text-xs text-zinc-400">Official Receipt</span>
          </div>
          <ReceiptRow label="Reference No." value={state.referenceNumber} />
          <ReceiptRow label="Date" value={paidDate.toLocaleString("en-GB")} />
          <ReceiptRow label="Bill Type" value={billLabel} />
          <ReceiptRow label="Account Number" value={state.accountNumber} />
          <ReceiptRow label="Name" value={state.fullName} />
          <ReceiptRow
            label="Payment Method"
            value={
              state.method === "govpay"
                ? `GovPay — ${state.govBank}`
                : state.method === "card"
                  ? "Debit / Credit Card"
                  : "Online Bank Transfer"
            }
          />
          <div className="flex justify-between items-center pt-3 mt-3 border-t border-zinc-200">
            <span className="text-sm font-bold text-[#1B1C1C]">Amount Paid</span>
            <span className="text-lg font-extrabold text-[#81081C]">
              Rs. {Number(state.amount || 0).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 border border-zinc-300 text-[#1B1C1C] font-semibold text-sm py-2.5 rounded-lg hover:bg-zinc-50"
          >
            Print / Save Receipt
          </button>
          <button
            onClick={handleDone}
            className="flex-1 bg-[#81081C] hover:bg-[#5E0614] text-white font-semibold text-sm py-2.5 rounded-lg"
          >
            Make Another Payment
          </button>
        </div>
      </div>
    </div>
  );
}

function ReceiptRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span className="text-zinc-500">{label}</span>
      <span className="font-medium text-[#1B1C1C]">{value || "—"}</span>
    </div>
  );
}
