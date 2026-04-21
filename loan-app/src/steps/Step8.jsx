import { useContext, useState } from "react";
import { FormContext } from "../context/FormContext";

function Step8({ prev }) {
  const { formData } = useContext(FormContext);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [consent, setConsent] = useState({
    terms: false,
    credit: false,
    privacy: false,
  });

  const allChecked = Object.values(consent).every(Boolean);

  // 🔥 EMI
  const calculateEMI = () => {
    const P = Number(formData.amount) || 0;
    const r = 10 / 12 / 100;
    const n = 12;

    if (P === 0) return 0;

    const emi =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    return Number(emi.toFixed(2));
  };

  // 🚀 EMI VALIDATION
  const isEligible = () => {
    const emi = calculateEMI();
    const income =
      Number(formData.coIncome || 0) +
      Number(formData.monthlyIncome || 0);

    return emi <= income * 0.5;
  };

  // 🚀 PRE-APPROVAL SUMMARY
  const interestRate = 10;
  const tenure = 12;

  const totalPayment = calculateEMI() * tenure;
  const processingFee = formData.amount * 0.02;

  // 🚀 REF ID
  const refId = "LN" + Math.floor(Math.random() * 1000000);

  const handleSubmit = async () => {
    if (!allChecked) {
      alert("Please accept all consents");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append("loan_type", formData.loanType);
      data.append("amount", formData.amount);
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("pan", formData.pan);
      data.append("aadhaar", formData.aadhaar);

      formData.documents?.forEach((file) => {
        data.append("documents", file);
      });

      data.append("signature", formData.signature);

      const res = await fetch("http://127.0.0.1:8000/api/apply/", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setSubmitted(true);
        localStorage.removeItem("loanForm");
      } else {
        alert("Submission failed");
      }
    } catch (err) {
      alert("Server error");
    }

    setLoading(false);
  };

  // ✅ SUCCESS SCREEN
  if (submitted) {
    return (
      <div style={successContainer}>
        <h2 style={{ fontSize: 28 }}>🎉 Application Submitted</h2>

        <p style={{ marginTop: 10, color: "#6b7280" }}>
          Your loan request has been successfully submitted.
        </p>

        <p style={{ marginTop: 10, fontWeight: 600 }}>
          Reference ID: {refId}
        </p>

        <button
          onClick={() => window.location.reload()}
          style={primaryBtn}
        >
          Start New Application
        </button>
      </div>
    );
  }

  return (
    <div style={container}>
      {/* Header */}
      <div style={{ marginBottom: "1.2rem" }}>
        <span style={badgeStyle}>Final Step</span>

        <h2 style={titleStyle}>Confirm & Submit</h2>

        <p style={subtitleStyle}>
          Review your application and provide consent to proceed
        </p>
      </div>

      {/* EMI Card */}
      <div style={emiCard}>
        <p style={{ fontSize: 13 }}>Estimated EMI</p>
        <h2 style={{ fontSize: 28 }}>₹ {calculateEMI()}</h2>
      </div>

      {/* 🚀 EMI WARNING */}
      {!isEligible() && (
        <p style={{ color: "red", marginTop: 10 }}>
          ⚠ EMI exceeds 50% of your income
        </p>
      )}

      {/* Summary */}
      <div style={card}>
        <p><b>Loan Type:</b> {formData.loanType}</p>
        <p><b>Amount:</b> ₹ {formData.amount}</p>
        <p><b>Name:</b> {formData.name}</p>
        <p><b>Email:</b> {formData.email}</p>
        <p><b>PAN:</b> {formData.pan}</p>
      </div>

      {/* 🚀 PRE-APPROVAL */}
      <div style={{ ...card, marginTop: 16 }}>
        <h3 style={{ marginBottom: 10 }}>Loan Summary</h3>

        <p><b>Interest Rate:</b> {interestRate}%</p>
        <p><b>Total Payment:</b> ₹ {totalPayment}</p>
        <p><b>Processing Fee:</b> ₹ {processingFee}</p>
      </div>

      {/* Consent */}
      <div style={{ ...card, marginTop: 16 }}>
        <h3 style={{ marginBottom: 10 }}>Consents</h3>

        {Object.keys(consent).map((key) => (
          <label key={key} style={checkboxStyle}>
            <input
              type="checkbox"
              onChange={(e) =>
                setConsent({ ...consent, [key]: e.target.checked })
              }
            />
            <span style={{ marginLeft: 8 }}>
              {key === "terms" && "Accept Terms & Conditions"}
              {key === "credit" && "Allow Credit Check"}
              {key === "privacy" && "Accept Privacy Policy"}
            </span>
          </label>
        ))}
      </div>

      {/* Buttons */}
      <div style={buttonCenter}>
        <button onClick={prev} style={secondaryBtn}>
          Back
        </button>

        <button
          onClick={handleSubmit}
          disabled={!allChecked || loading}
          style={{
            ...primaryBtn,
            background: allChecked ? "#185FA5" : "#9ca3af",
            cursor: allChecked ? "pointer" : "not-allowed",
          }}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}

/* 🔥 Styles (unchanged) */

const container = {
  fontFamily: "'DM Sans', sans-serif",
  maxWidth: 480,
  margin: "0 auto",
};

const badgeStyle = {
  fontSize: 12,
  fontWeight: 500,
  color: "#0C447C",
  background: "#E6F1FB",
  borderRadius: 999,
  padding: "3px 12px",
};

const titleStyle = {
  fontFamily: "'Fraunces', serif",
  fontSize: 26,
  fontWeight: 600,
  marginTop: 8,
};

const subtitleStyle = {
  fontSize: 13,
  color: "#6b7280",
};

const emiCard = {
  background: "#185FA5",
  borderRadius: 16,
  padding: "20px",
  color: "#fff",
  marginTop: 16,
};

const card = {
  border: "1.5px solid #e5e7eb",
  borderRadius: 14,
  padding: "16px",
  marginTop: 16,
};

const checkboxStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: 8,
  fontSize: 14,
};

const buttonCenter = {
  display: "flex",
  justifyContent: "center",
  gap: 12,
  marginTop: "2rem",
};

const primaryBtn = {
  padding: "12px 22px",
  borderRadius: 12,
  background: "#185FA5",
  color: "#fff",
  border: "none",
};

const secondaryBtn = {
  padding: "12px 22px",
  borderRadius: 12,
  background: "#fff",
  border: "1.5px solid #e5e7eb",
};

const successContainer = {
  textAlign: "center",
  padding: "2rem",
  fontFamily: "'DM Sans', sans-serif",
};

export default Step8;