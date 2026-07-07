import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePaymentFlow } from "../context/PaymentFlowContext";
import StepIndicator from "../components/StepIndicator";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

// Demo-only OTP generator. In production, OTPs must be generated and
// verified server-side and delivered via a real SMS gateway — never
// generated or checked purely in the browser like this.
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function OtpVerificationPage() {
  const { state, update } = usePaymentFlow();
  const navigate = useNavigate();
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [sentOtp, setSentOtp] = useState("");
  const inputsRef = useRef([]);

  useEffect(() => {
    if (!state.verified) {
      navigate("/payments", { replace: true });
      return;
    }
    sendOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  function sendOtp() {
    const code = generateOtp();
    setSentOtp(code);
    update("otpCode", code);
    update("otpSentTo", state.mobile);
    setSecondsLeft(RESEND_SECONDS);
    setDigits(Array(OTP_LENGTH).fill(""));
    setError("");
  }

  function handleChange(i, value) {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[i] = value;
    setDigits(next);
    if (value && i < OTP_LENGTH - 1) inputsRef.current[i + 1]?.focus();
  }

  function handleKeyDown(i, e) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  }

  function handleVerify() {
    const entered = digits.join("");
    if (entered.length < OTP_LENGTH) {
      setError("Please enter the full 6-digit code.");
      return;
    }
    if (entered !== sentOtp) {
      setError("Incorrect code. Please try again.");
      return;
    }
    update("otpVerified", true);
    navigate("/payments/method");
  }

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <StepIndicator current={2} />
      <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 text-center">
        <h2 className="text-xl font-extrabold text-[#1B1C1C] mb-1">Verify Your Number</h2>
        <p className="text-sm text-zinc-500 mb-6">
          We've sent a 6-digit code to <span className="font-semibold text-[#1B1C1C]">{state.mobile}</span>.
        </p>

        {/* Demo notice — remove once wired to a real SMS gateway */}
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg px-3 py-2 mb-6">
          Demo mode: your OTP is <span className="font-bold">{sentOtp}</span> — in production
          this is sent by SMS and never shown on screen.
        </div>

        <div className="flex justify-center gap-2 mb-4">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              inputMode="numeric"
              maxLength={1}
              className="w-11 h-12 text-center text-lg font-bold border border-zinc-300 rounded-lg focus:outline-none focus:border-[#81081C]"
            />
          ))}
        </div>

        {error && <p className="text-xs text-red-600 mb-4">{error}</p>}

        <button
          onClick={handleVerify}
          className="w-full bg-[#81081C] hover:bg-[#5E0614] text-white font-bold py-3 rounded-lg text-sm transition-colors mb-3"
        >
          Verify Code
        </button>

        <button
          onClick={sendOtp}
          disabled={secondsLeft > 0}
          className="text-xs font-semibold text-[#81081C] disabled:text-zinc-400 disabled:cursor-not-allowed"
        >
          {secondsLeft > 0 ? `Resend code in ${secondsLeft}s` : "Resend Code"}
        </button>
      </div>
    </div>
  );
}
