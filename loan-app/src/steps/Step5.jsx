import { useContext } from "react";
import { FormContext } from "../context/FormContext";

function Step5({ next, prev }) {
  const { formData } = useContext(FormContext);

  // EMI Calculation
  const calculateEMI = () => {
    const P = Number(formData.amount) || 0;
    const r = 10 / 12 / 100;
    const n = 12;

    if (P === 0) return 0;

    const emi =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    return emi.toFixed(2);
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        maxWidth: 480,
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
          Step 5 of 8
        </span>

        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          Review Details
        </h2>
      </div>

      {/* EMI Card */}
      <div
        style={{
          background: "#185FA5",
          borderRadius: 16,
          padding: "20px",
          color: "#fff",
          marginBottom: "1.5rem",
        }}
      >
        <p style={{ fontSize: 13 }}>Estimated EMI</p>
        <h2 style={{ fontSize: 28 }}>₹ {calculateEMI()}</h2>
      </div>

      {/* Summary */}
      <div
        style={{
          border: "1.5px solid #e5e7eb",
          borderRadius: 14,
          padding: "16px",
          marginBottom: "1.5rem",
        }}
      >
        <p><b>Loan Type:</b> {formData.loanType}</p>
        <p><b>Amount:</b> ₹ {formData.amount}</p>
        <p><b>Name:</b> {formData.name}</p>
        <p><b>Email:</b> {formData.email}</p>
        <p><b>PAN:</b> {formData.pan}</p>
        <p><b>Aadhaar:</b> {formData.aadhaar}</p>
        <p><b>Document:</b> {formData.document?.name}</p>
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
          onClick={prev}
          style={{
            padding: "13px",
            borderRadius: 12,
            border: "1.5px solid #e5e7eb",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Back
        </button>

        <button
          onClick={next}
          style={{
            padding: "13px",
            borderRadius: 12,
            background: "#185FA5",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Step5;