import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { FormContext } from "../context/FormContext";

const inputBase = {
  width: "100%",
  boxSizing: "border-box",
  border: "1.5px solid #e5e7eb",
  borderRadius: 12,
  padding: "13px 14px",
  fontSize: 15,
  fontWeight: 500,
  fontFamily: "'DM Sans', sans-serif",
  outline: "none",
  background: "#fff",
  color: "#111827",
};

const inputError = {
  ...inputBase,
  border: "1.5px solid #dc2626",
};

const labelStyle = {
  display: "block",
  fontSize: 12,
  fontWeight: 500,
  color: "#6b7280",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: 6,
};

function Step3({ next, prev }) {
  const { formData, updateFormData } = useContext(FormContext);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [panVerified, setPanVerified] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);

  const [panLoading, setPanLoading] = useState(false);
  const [aadhaarLoading, setAadhaarLoading] = useState(false);

  const panValue = watch("pan");
  const aadhaarValue = watch("aadhaar");

  useEffect(() => {
    if (formData.pan) setValue("pan", formData.pan);
    if (formData.aadhaar) setValue("aadhaar", formData.aadhaar);
  }, [formData, setValue]);

  const validatePAN = (pan) =>
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);

  const validateAadhaar = (aadhaar) =>
    /^[0-9]{12}$/.test(aadhaar);

  const verifyPAN = () => {
    if (!validatePAN(panValue)) return;

    setPanLoading(true);
    setPanVerified(false);

    setTimeout(() => {
      setPanLoading(false);
      setPanVerified(true);
    }, 1200);
  };

  const verifyAadhaar = () => {
    if (!validateAadhaar(aadhaarValue)) return;

    setAadhaarLoading(true);
    setAadhaarVerified(false);

    setTimeout(() => {
      setAadhaarLoading(false);
      setAadhaarVerified(true);
    }, 1200);
  };

  const onSubmit = (data) => {
    if (!panVerified || !aadhaarVerified) return;

    updateFormData(data);
    next();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        maxWidth: 460,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "1.2rem" }}>
        <span
          style={{
            display: "inline-flex",
            fontSize: 12,
            fontWeight: 500,
            color: "#0C447C",
            background: "#E6F1FB",
            borderRadius: 999,
            padding: "3px 12px",
            marginBottom: 12,
          }}
        >
          Step 3 of 8
        </span>

        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 26,
            fontWeight: 600,
            margin: "0 0 4px",
          }}
        >
          KYC Verification
        </h2>

        <p style={{ fontSize: 13, color: "#6b7280" }}>
          Verify your identity securely
        </p>
      </div>

      {/* PAN */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>PAN Number</label>

        <div style={{ display: "flex", gap: 10 }}>
          <input
            placeholder="ABCDE1234F"
            {...register("pan", { required: "PAN is required" })}
            style={errors.pan ? inputError : inputBase}
            onChange={(e) => {
              const val = e.target.value.toUpperCase();
              setValue("pan", val);
              setPanVerified(false);
            }}
          />

          <button
            type="button"
            onClick={verifyPAN}
            style={{
              padding: "0 14px",
              borderRadius: 10,
              border: "1.5px solid #185FA5",
              background: panVerified ? "#10b981" : "#fff",
              color: panVerified ? "#fff" : "#185FA5",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {panLoading
              ? "Verifying..."
              : panVerified
              ? "✓ Verified"
              : "Verify"}
          </button>
        </div>

        {errors.pan && (
          <p style={{ fontSize: 12, color: "#dc2626", marginTop: 4 }}>
            ⚠ {errors.pan.message}
          </p>
        )}
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "0.5px solid #e5e7eb",
          margin: "1.5rem 0",
        }}
      />

      {/* Aadhaar */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>Aadhaar Number</label>

        <div style={{ display: "flex", gap: 10 }}>
          <input
            placeholder="12-digit Aadhaar"
            {...register("aadhaar", {
              required: "Aadhaar is required",
            })}
            style={errors.aadhaar ? inputError : inputBase}
            onChange={(e) => {
              const val = e.target.value.replace(/\s/g, "");
              setValue("aadhaar", val);
              setAadhaarVerified(false);
            }}
          />

          <button
            type="button"
            onClick={verifyAadhaar}
            style={{
              padding: "0 14px",
              borderRadius: 10,
              border: "1.5px solid #185FA5",
              background: aadhaarVerified ? "#10b981" : "#fff",
              color: aadhaarVerified ? "#fff" : "#185FA5",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {aadhaarLoading
              ? "Verifying..."
              : aadhaarVerified
              ? "✓ Verified"
              : "Verify"}
          </button>
        </div>

        {errors.aadhaar && (
          <p style={{ fontSize: 12, color: "#dc2626", marginTop: 4 }}>
            ⚠ {errors.aadhaar.message}
          </p>
        )}
      </div>

      {/* Info Box */}
      <div
        style={{
          background: "#E6F1FB",
          border: "1.5px solid #B5D4F4",
          borderRadius: 12,
          padding: "12px 14px",
          fontSize: 13,
          color: "#0C447C",
          marginBottom: "1.5rem",
        }}
      >
        🔒 Your details are encrypted and used only for verification
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 10,
        }}
      >
        <button
          type="button"
          onClick={prev}
          style={{
            padding: "13px",
            borderRadius: 12,
            background: "#fff",
            border: "1.5px solid #e5e7eb",
            cursor: "pointer",
          }}
        >
          Back
        </button>

        <button
          type="submit"
          disabled={!panVerified || !aadhaarVerified}
          style={{
            padding: "13px",
            borderRadius: 12,
            background:
              panVerified && aadhaarVerified
                ? "#185FA5"
                : "#9ca3af",
            color: "#fff",
            border: "none",
            cursor:
              panVerified && aadhaarVerified
                ? "pointer"
                : "not-allowed",
          }}
        >
          Continue
        </button>
      </div>
    </form>
  );
}

export default Step3;