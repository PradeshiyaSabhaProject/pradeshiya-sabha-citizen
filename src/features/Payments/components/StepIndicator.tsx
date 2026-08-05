type StepIndicatorProps = {
  current: number;
};

const steps = [
  { n: 1, label: "Bill Details" },
  { n: 2, label: "Verify OTP" },
  { n: 3, label: "Payment" },
  { n: 4, label: "Receipt" },
];

export default function StepIndicator({
  current,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between max-w-lg mx-auto mb-8 px-2">
      {steps.map((s, i) => {
        let circleClass: string;

        if (s.n < current) {
          circleClass = "bg-[#81081C] border-[#81081C] text-white";
        } else if (s.n === current) {
          circleClass = "border-[#81081C] text-[#81081C] bg-white";
        } else {
          circleClass = "border-zinc-300 text-zinc-400 bg-white";
        }

        return (
          <div key={s.n} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${circleClass}`}
              >
                {s.n < current ? "✓" : s.n}
              </div>

              <span
                className={`text-[10px] mt-1 font-semibold whitespace-nowrap ${
                  s.n <= current ? "text-[#1B1C1C]" : "text-zinc-400"
                }`}
              >
                {s.label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-1 mb-4 ${
                  s.n < current ? "bg-[#81081C]" : "bg-zinc-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}