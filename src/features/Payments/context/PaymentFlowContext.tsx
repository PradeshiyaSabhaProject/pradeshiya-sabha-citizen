import { createContext, useContext, useMemo, useState } from "react";

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

const PaymentFlowContext = createContext<any>(undefined);

/**
 * Wrap your /payments/* routes with this provider so bill details, OTP
 * state, and the chosen payment method survive navigation between the
 * four steps of the flow.
 */
export function PaymentFlowProvider({ children }) {
  const [state, setState] = useState(initialState);

  /**
   * Updates a single key in the payment flow state.
   * @param key State key to update
   * @param value New value to set
   */
  function update(key, value) {
    setState((s) => ({ ...s, [key]: value }));
  }

  /**
   * Updates multiple keys in the payment flow state using a patch object.
   * @param patch Object containing key-value pairs to merge into state
   */
  function updateMany(patch) {
    setState((s) => ({ ...s, ...patch }));
  }

  /**
   * Resets the payment flow state back to its initial default values.
   */
  function reset() {
    setState(initialState);
  }

  const value = useMemo(() => ({ state, update, updateMany, reset }), [state]);

  return (
    <PaymentFlowContext.Provider value={value}>
      {children}
    </PaymentFlowContext.Provider>
  );
}

/**
 * Custom hook to access payment flow state and updater methods.
 * @returns Context containing state, update, updateMany, and reset
 */
export function usePaymentFlow(): any {
  const ctx = useContext(PaymentFlowContext);
  if (!ctx) throw new Error("usePaymentFlow must be used within a PaymentFlowProvider");
  return ctx;
}
