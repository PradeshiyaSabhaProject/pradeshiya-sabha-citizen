import { createContext, useContext, useState } from "react";

const initialState = {
  // Step 1 — bill details
  billType: "",
  otherBillDesc: "",
  accountNumber: "",
  fullName: "",
  nic: "",
  mobile: "",
  email: "",
  amount: "",
  verified: false,

  // Step 2 — OTP
  otpSentTo: "",
  otpCode: "", // demo only — this must be generated/checked server-side in production
  otpVerified: false,

  // Step 3 — payment method
  method: "",
  govBank: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvv: "",
  bankAccountRef: "",

  // Step 4 — result
  referenceNumber: "",
  paidAt: "",
};

const PaymentFlowContext = createContext(undefined);

/**
 * Wrap your /payments/* routes with this provider so bill details, OTP
 * state, and the chosen payment method survive navigation between the
 * four steps of the flow.
 */
export function PaymentFlowProvider({ children }) {
  const [state, setState] = useState(initialState);

  function update(key, value) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function updateMany(patch) {
    setState((s) => ({ ...s, ...patch }));
  }

  function reset() {
    setState(initialState);
  }

  return (
    <PaymentFlowContext.Provider value={{ state, update, updateMany, reset }}>
      {children}
    </PaymentFlowContext.Provider>
  );
}

export function usePaymentFlow() {
  const ctx = useContext(PaymentFlowContext);
  if (!ctx) throw new Error("usePaymentFlow must be used within a PaymentFlowProvider");
  return ctx;
}
