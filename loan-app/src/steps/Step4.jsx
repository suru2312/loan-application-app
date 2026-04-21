import { useState, useContext } from "react";
import { FormContext } from "../context/FormContext";

function Step4({ next, prev }) {
  const { updateFormData } = useContext(FormContext);

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only JPG, PNG, PDF allowed");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleSubmit = () => {
    if (!file) {
      setError("Please upload a document");
      return;
    }

    updateFormData({ document: file });
    next();
  };

  return (
    <div
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
          Step 4 of 4
        </span>

        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 26,
            fontWeight: 600,
            margin: "0 0 4px",
          }}
        >
          Upload Documents
        </h2>

        <p style={{ fontSize: 13, color: "#6b7280" }}>
          Upload a valid document for verification
        </p>
      </div>

      {/* Upload Box */}
      <label
        style={{
          display: "block",
          border: "2px dashed #cbd5e1",
          borderRadius: 14,
          padding: "28px 16px",
          textAlign: "center",
          cursor: "pointer",
          background: "#f9fafb",
          transition: "border-color 0.2s",
        }}
      >
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <div style={{ fontSize: 28, marginBottom: 8 }}>📄</div>

        <p style={{ fontSize: 14, fontWeight: 500 }}>
          Click to upload or drag & drop
        </p>

        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
          JPG, PNG or PDF (Max 5MB)
        </p>
      </label>

      {/* Error */}
      {error && (
        <p style={{ fontSize: 12, color: "#dc2626", marginTop: 8 }}>
          ⚠ {error}
        </p>
      )}

      {/* File Preview */}
      {file && (
        <div
          style={{
            marginTop: 14,
            padding: "12px 14px",
            borderRadius: 12,
            background: "#ecfdf5",
            border: "1.5px solid #a7f3d0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 13,
            color: "#065f46",
          }}
        >
          <span>📎 {file.name}</span>
          <span>✓ Uploaded</span>
        </div>
      )}

      {/* Info Box */}
      <div
        style={{
          marginTop: 16,
          background: "#E6F1FB",
          border: "1.5px solid #B5D4F4",
          borderRadius: 12,
          padding: "12px 14px",
          fontSize: 13,
          color: "#0C447C",
        }}
      >
        🔒 Your document is securely stored and used only for verification
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 10,
          marginTop: "1.8rem",
        }}
      >
        <button
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
          onClick={handleSubmit}
          style={{
            padding: "13px",
            borderRadius: 12,
            background: file ? "#185FA5" : "#9ca3af",
            color: "#fff",
            border: "none",
            cursor: file ? "pointer" : "not-allowed",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Step4;