import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { FormContext } from "../context/FormContext";

const LOAN_TYPES = [
  { id: "personal", label: "Personal", icon: "👤" },
  { id: "home",     label: "Home",     icon: "🏠" },
  { id: "business", label: "Business", icon: "💼" },
];

function Step1({ next }) {
  const { formData, updateFormData } = useContext(FormContext);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const loanType = watch("loanType");

  useEffect(() => {
    if (formData.loanType) {
      setValue("loanType", formData.loanType);
      setValue("amount", formData.amount);
      setValue("businessName", formData.businessName);
    }
  }, [formData, setValue]);

  const onSubmit = (data) => {
    updateFormData(data);
    next();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 480, margin: "0 auto", padding: "1rem 1rem" }}
    >
      {/* Step badge + Header */}
      <div style={{ marginBottom: "2rem" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 12, fontWeight: 500, color: "#185FA5",
          background: "#E6F1FB", borderRadius: 999, padding: "4px 12px",
          marginBottom: 12, letterSpacing: "0.3px"
        }}>
          Step 1 of 3
        </span>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 600, margin: "0 0 4px", letterSpacing: "-0.5px" }}>
          Loan Application
        </h2>
        <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
          Select a loan type and enter the amount
        </p>
      </div>

      {/* Loan Type Cards */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#6b7280", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.4px" }}>
          Loan type
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {LOAN_TYPES.map(({ id, label, icon }) => (
            <label
              key={id}
              style={{
                cursor: "pointer",
                border: `1.5px solid ${loanType === id ? "#185FA5" : "#e5e7eb"}`,
                borderRadius: 12,
                padding: "16px 8px 14px",
                textAlign: "center",
                background: loanType === id ? "#E6F1FB" : "#fff",
                transition: "border-color 0.15s, background 0.15s",
                userSelect: "none",
              }}
            >
              <input
                type="radio"
                value={id}
                {...register("loanType", { required: "Please select a loan type" })}
                style={{ display: "none" }}
              />
              <span style={{ display: "block", fontSize: 22, marginBottom: 6, lineHeight: 1 }}>{icon}</span>
              <span style={{
                fontSize: 13, fontWeight: loanType === id ? 500 : 400,
                color: loanType === id ? "#185FA5" : "#374151",
              }}>
                {label}
              </span>
            </label>
          ))}
        </div>
        {errors.loanType && (
          <p style={{ fontSize: 12, color: "#dc2626", marginTop: 6 }}>⚠ {errors.loanType.message}</p>
        )}
      </div>

      <hr style={{ border: "none", borderTop: "0.5px solid #e5e7eb", margin: "1.75rem 0" }} />

      {/* Loan Amount */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#6b7280", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.4px" }}>
          Loan amount
        </label>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, fontWeight: 500, color: "#9ca3af", pointerEvents: "none" }}>₹</span>
          <input
            type="number"
            placeholder="Minimum ₹50,000"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 50000, message: "Minimum amount is ₹50,000" },
            })}
            style={{
              width: "100%", boxSizing: "border-box",
              border: `1.5px solid ${errors.amount ? "#dc2626" : "#e5e7eb"}`,
              borderRadius: 12, padding: "14px 14px 14px 32px",
              fontSize: 16, fontWeight: 500, outline: "none",
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>Enter amount in Indian Rupees (INR)</p>
        {errors.amount && (
          <p style={{ fontSize: 12, color: "#dc2626", marginTop: 4 }}>⚠ {errors.amount.message}</p>
        )}
      </div>

      {/* Business Name (Conditional) */}
      {loanType === "business" && (
        <div style={{ marginBottom: "1.5rem", animation: "slideIn 0.2s ease" }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#6b7280", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.4px" }}>
            Business name
          </label>
          <input
            type="text"
            placeholder="Enter your registered business name"
            {...register("businessName", { required: "Business name is required" })}
            style={{
              width: "100%", boxSizing: "border-box",
              border: `1.5px solid ${errors.businessName ? "#dc2626" : "#e5e7eb"}`,
              borderRadius: 12, padding: "14px",
              fontSize: 16, outline: "none",
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
          {errors.businessName && (
            <p style={{ fontSize: 12, color: "#dc2626", marginTop: 6 }}>⚠ {errors.businessName.message}</p>
          )}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        style={{
          width: "100%", padding: "15px",
          borderRadius: 12, background: "#185FA5",
          color: "#fff", fontFamily: "'DM Sans', sans-serif",
          fontSize: 15, fontWeight: 500, border: "none",
          cursor: "pointer", marginTop: "1.5rem",
          letterSpacing: "0.2px", transition: "background 0.15s",
        }}
        onMouseOver={e => e.target.style.background = "#0C447C"}
        onMouseOut={e => e.target.style.background = "#185FA5"}
      >
        Continue
      </button>
    </form>
  );
}

export default Step1;