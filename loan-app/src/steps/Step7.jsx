import { useState, useRef, useContext } from "react";
import SignatureCanvas from "react-signature-canvas";
import { FormContext } from "../context/FormContext";

function Step7({ next, prev }) {
  const { formData, updateFormData } = useContext(FormContext);

  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const sigRef = useRef();

  // 🔥 Required documents logic (project requirement)
  const getRequiredDocs = () => {
    if (formData.loanType === "home") return ["Property Document"];
    if (formData.employmentType === "salaried") return ["Salary Slips"];
    return ["ITR Document"];
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);

    if (selected.length > 5) {
      setError("Maximum 5 files allowed");
      return;
    }

    setFiles(selected);
    setError("");
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      setError("Please upload at least one document");
      return;
    }

    if (sigRef.current.isEmpty()) {
      setError("Signature is required");
      return;
    }

    const signature = sigRef.current.toDataURL();

    updateFormData({
      documents: files,
      signature,
    });

    next();
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "1.2rem" }}>
        <span style={badgeStyle}>Step 7 of 8</span>

        <h2 style={titleStyle}>Documents & Signature</h2>

        <p style={subtitleStyle}>
          Upload your documents and sign to complete verification
        </p>
      </div>

      {/* 🔥 Required Docs */}
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 500 }}>
          Required Documents:
        </p>
        <ul style={{ fontSize: 13, color: "#374151" }}>
          {getRequiredDocs().map((doc, i) => (
            <li key={i}>📄 {doc}</li>
          ))}
        </ul>
      </div>

      {/* 🔥 SIDE BY SIDE */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        {/* Upload */}
        <div style={cardStyle}>
          <label style={uploadBox}>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <div style={{ fontSize: 26 }}>📁</div>
            <p style={{ fontWeight: 500 }}>
              Click to upload documents
            </p>
            <p style={smallText}>
              PDF, JPG, PNG (Max 5 files)
            </p>
          </label>

          {files.length > 0 && (
            <div style={{ marginTop: 12 }}>
              {files.map((f, i) => (
                <div key={i} style={fileItem}>
                  📄 {f.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Signature */}
        <div style={cardStyle}>
          <h3 style={{ marginBottom: 8 }}>E-Signature</h3>

          <SignatureCanvas
            ref={sigRef}
            canvasProps={{
              style: {
                width: "100%",
                height: 180,
                borderRadius: 10,
                border: "1.5px solid #e5e7eb",
              },
            }}
          />

          <button
            onClick={() => sigRef.current.clear()}
            style={{ ...secondaryBtn, marginTop: 10 }}
          >
            Clear Signature
          </button>
        </div>
      </div>

      {/* Error */}
      {error && <p style={errorStyle}>⚠ {error}</p>}

      {/* Info */}
      <div style={infoBox}>
        🔒 Your documents are securely stored and encrypted
      </div>

      {/* 🔥 CENTERED BUTTONS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          marginTop: "2rem",
        }}
      >
        <button onClick={prev} style={secondaryBtn}>
          Back
        </button>

        <button onClick={handleSubmit} style={primaryBtn}>
          Continue
        </button>
      </div>
    </div>
  );
}

/* 🔥 Styles */

const badgeStyle = {
  display: "inline-flex",
  fontSize: 12,
  fontWeight: 500,
  color: "#0C447C",
  background: "#E6F1FB",
  borderRadius: 999,
  padding: "3px 12px",
  marginBottom: 12,
};

const titleStyle = {
  fontFamily: "'Fraunces', serif",
  fontSize: 26,
  fontWeight: 600,
  marginBottom: 4,
};

const subtitleStyle = {
  fontSize: 13,
  color: "#6b7280",
};

const cardStyle = {
  border: "1.5px solid #e5e7eb",
  borderRadius: 16,
  padding: "18px",
};

const uploadBox = {
  display: "block",
  textAlign: "center",
  padding: "20px",
  border: "2px dashed #cbd5e1",
  borderRadius: 12,
  cursor: "pointer",
  background: "#f9fafb",
};

const fileItem = {
  background: "#ecfdf5",
  border: "1px solid #a7f3d0",
  borderRadius: 8,
  padding: "8px 10px",
  marginBottom: 6,
  fontSize: 13,
};

const smallText = {
  fontSize: 12,
  color: "#6b7280",
};

const errorStyle = {
  fontSize: 12,
  color: "#dc2626",
  marginTop: 10,
  textAlign: "center",
};

const infoBox = {
  marginTop: 16,
  background: "#E6F1FB",
  border: "1.5px solid #B5D4F4",
  borderRadius: 12,
  padding: "12px 14px",
  fontSize: 13,
  color: "#0C447C",
};

const primaryBtn = {
  padding: "13px 24px",
  borderRadius: 12,
  background: "#185FA5",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "13px 24px",
  borderRadius: 12,
  background: "#fff",
  border: "1.5px solid #e5e7eb",
  cursor: "pointer",
};

export default Step7;