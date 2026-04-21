import { useState, useContext } from "react";
import Step1 from "../steps/Step1";
import Step2 from "../steps/Step2";
import Step3 from "../steps/Step3";
import Step4 from "../steps/Step4";
import Step5 from "../steps/Step5";
import Step6 from "../steps/Step6";
import Step7 from "../steps/Step7";
import Step8 from "../steps/Step8";
import { FormContext } from "../context/FormContext";
import useAutoSave from "../utils/useAutoSave";

function FormPage() {
  const { formData, updateFormData } = useContext(FormContext);

  // 🔥 Auto-save
  useAutoSave(formData, updateFormData);

  const [step, setStep] = useState(1);

  // 🔥 FIXED NEXT FUNCTION
  const next = () => {
    setStep((prev) => {
      // Skip Step 6 if not required
      if (prev === 5) {
        const shouldShowStep6 =
          formData.loanType === "home" ||
          (formData.loanType === "personal" &&
            Number(formData.amount) > 500000) ||
          (formData.loanType === "business" &&
            Number(formData.amount) > 2000000);

        return shouldShowStep6 ? 6 : 7;
      }

      return prev + 1;
    });
  };

  const prev = () => setStep((prev) => prev - 1);

  // 🔥 CONDITION FOR STEP 6
  const shouldShowStep6 =
    formData.loanType === "home" ||
    (formData.loanType === "personal" &&
      Number(formData.amount) > 500000) ||
    (formData.loanType === "business" &&
      Number(formData.amount) > 2000000);

  return (
    <div>
      {step === 1 && <Step1 next={next} />}
      {step === 2 && <Step2 next={next} prev={prev} />}
      {step === 3 && <Step3 next={next} prev={prev} />}
      {step === 4 && <Step4 next={next} prev={prev} />}
      {step === 5 && <Step5 next={next} prev={prev} />}

      {step === 6 && shouldShowStep6 && (
        <Step6 next={next} prev={prev} />
      )}

      {step === 7 && <Step7 next={next} prev={prev} />}
      {step === 8 && <Step8 prev={prev} />}
    </div>
  );
}

export default FormPage;