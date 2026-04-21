import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { FormContext } from "../context/FormContext";

const inputBase = {
  width: "100%",
  boxSizing: "border-box",
  border: "1.5px solid #e5e7eb",
  borderRadius: 12,
  padding: "13px 14px 13px 44px",
  fontSize: 15,
  fontWeight: 500,
  fontFamily: "'DM Sans', sans-serif",
  outline: "none",
  background: "#fff",
  color: "#111827",
  transition: "border-color 0.15s",
};

const inputErrorStyle = { ...inputBase, border: "1.5px solid #dc2626" };

const labelStyle = {
  display: "block",
  fontSize: 12,
  fontWeight: 500,
  color: "#6b7280",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: 8,
};

const IconUser = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#9ca3af", pointerEvents: "none" }}
  >
    <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M2.5 13.5c0-2.485 2.239-4.5 5.5-4.5s5.5 2.015 5.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconMail = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#9ca3af", pointerEvents: "none" }}
  >
    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M1.5 5.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

function Step2({ next, prev }) {
  const { formData, updateFormData } = useContext(FormContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (formData.name) {
      setValue("name", formData.name);
      setValue("email", formData.email);
      setValue("phone", formData.phone);
    }
  }, [formData, setValue]);

  const onSubmit = (data) => {
    updateFormData(data);
    localStorage.removeItem("loanForm");
    next();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 460, margin: "0 auto", padding: "0rem 0rem" }}
    >
      {/* Badge + header */}
      <div style={{ marginBottom: "1rem" }}>
        <span style={{
          display: "inline-flex", alignItems: "center",
          fontSize: 12, fontWeight: 500, color: "#0C447C",
          background: "#E6F1FB", borderRadius: 999,
          padding: "3px 12px", marginBottom: 14, letterSpacing: "0.3px",
        }}>
          Step 2 of 3
        </span>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600, margin: "0 0 4px", letterSpacing: "-0.5px" }}>
          Personal info
        </h2>
        {/* <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
          Tell us a bit about yourself
        </p> */}
      </div>

      {/* Full Name */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>Full name</label>
        <div style={{ position: "relative" }}>
          <IconUser />
          <input
            type="text"
            placeholder="e.g. Rahul Sharma"
            autoComplete="name"
            {...register("name", { required: "Name is required" })}
            style={errors.name ? inputErrorStyle : inputBase}
          />
        </div>
        {errors.name && (
          <p style={{ fontSize: 12, color: "#dc2626", marginTop: 5 }}>⚠ {errors.name.message}</p>
        )}
      </div>

      <hr style={{ border: "none", borderTop: "0.5px solid #e5e7eb", margin: "1.5rem 0" }} />

      {/* Email */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>Email address</label>
        <div style={{ position: "relative" }}>
          <IconMail />
          <input
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
            })}
            style={errors.email ? inputErrorStyle : inputBase}
          />
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 5 }}>Loan updates will be sent here</p>
        {errors.email && (
          <p style={{ fontSize: 12, color: "#dc2626", marginTop: 4 }}>⚠ {errors.email.message}</p>
        )}
      </div>

      <hr style={{ border: "none", borderTop: "0.5px solid #e5e7eb", margin: "1.5rem 0" }} />

      {/* Phone */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>Phone number</label>
        <div style={{ position: "relative" }}>
          <span style={{
            position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            fontSize: 13, fontWeight: 500, color: "#9ca3af", pointerEvents: "none",
          }}>+91</span>
          <input
            type="tel"
            placeholder="10-digit mobile number"
            autoComplete="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile number" },
            })}
            style={{ ...(errors.phone ? inputErrorStyle : inputBase), paddingLeft: 50 }}
          />
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 5 }}>Used for OTP verification only</p>
        {errors.phone && (
          <p style={{ fontSize: 12, color: "#dc2626", marginTop: 4 }}>⚠ {errors.phone.message}</p>
        )}
      </div>

      {/* Business notice */}
      {formData.loanType === "business" && (
        <div style={{
          display: "flex", alignItems: "flex-start", gap: 10,
          background: "#E6F1FB", border: "1.5px solid #B5D4F4",
          borderRadius: 12, padding: "13px 16px", marginBottom: "1.25rem",
          fontSize: 13, color: "#0C447C", fontWeight: 500, lineHeight: 1.5,
        }}>
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ width: 16, height: 16, flexShrink: 0, marginTop: 1 }}>
            <rect x="1.5" y="5.5" width="13" height="9" rx="1" stroke="#185FA5" strokeWidth="1.4" />
            <path d="M5.5 5.5V4a2.5 2.5 0 015 0v1.5" stroke="#185FA5" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="8" y1="9" x2="8" y2="11" stroke="#185FA5" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span>Business loan selected — additional KYC and GST verification will be required in the next step.</span>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 10, marginTop: "1.75rem" }}>
        <button
          type="button"
          onClick={prev}
          style={{
            padding: "13px", borderRadius: 12, background: "#fff",
            color: "#374151", fontFamily: "'DM Sans', sans-serif",
            fontSize: 14, fontWeight: 500, border: "1.5px solid #e5e7eb",
            cursor: "pointer", transition: "background 0.15s",
          }}
          onMouseOver={e => e.currentTarget.style.background = "#f3f4f6"}
          onMouseOut={e => e.currentTarget.style.background = "#fff"}
        >
          Back
        </button>

        <button
          type="submit"
          style={{
            padding: "13px", borderRadius: 12, background: "#185FA5",
            color: "#fff", fontFamily: "'DM Sans', sans-serif",
            fontSize: 14, fontWeight: 500, border: "none",
            cursor: "pointer", transition: "background 0.15s",
          }}
          onMouseOver={e => e.currentTarget.style.background = "#0C447C"}
          onMouseOut={e => e.currentTarget.style.background = "#185FA5"}
        >
          Submit application
        </button>
      </div>
    </form>
  );
}

export default Step2;
