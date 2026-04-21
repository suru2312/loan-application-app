import { useForm } from "react-hook-form";
import { useContext } from "react";
import { FormContext } from "../context/FormContext";

function Step6({ next, prev }) {
  const { formData, updateFormData } = useContext(FormContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      coName: formData.coName || "",
      coRelation: formData.coRelation || "",
      coIncome: formData.coIncome || "",
    },
  });

  const onSubmit = (data) => {
    updateFormData(data);
    next();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          Step 6 of 8
        </span>

        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 26,
            fontWeight: 600,
            marginBottom: 4,
          }}
        >
          Co-Applicant Details
        </h2>

        <p style={{ fontSize: 13, color: "#6b7280" }}>
          Provide co-applicant information (if applicable)
        </p>
      </div>

      {/* Form Card */}
      <div
        style={{
          border: "1.5px solid #e5e7eb",
          borderRadius: 16,
          padding: "20px",
        }}
      >
        {/* Full Name */}
        <label style={{ fontSize: 13, fontWeight: 500 }}>
          Full Name
        </label>
        <input
          placeholder="Enter full name"
          {...register("coName", { required: "Full name is required" })}
          style={inputStyle}
        />
        {errors.coName && <p style={errorStyle}>{errors.coName.message}</p>}

        {/* Relation */}
        <label style={{ fontSize: 13, fontWeight: 500, marginTop: 14, display: "block" }}>
          Relationship
        </label>
        <select
          {...register("coRelation", { required: "Relationship is required" })}
          style={inputStyle}
        >
          <option value="">Select relationship</option>
          <option value="spouse">Spouse</option>
          <option value="parent">Parent</option>
          <option value="sibling">Sibling</option>
        </select>
        {errors.coRelation && <p style={errorStyle}>{errors.coRelation.message}</p>}

        {/* Income */}
        <label style={{ fontSize: 13, fontWeight: 500, marginTop: 14, display: "block" }}>
          Monthly Income
        </label>
        <input
          type="number"
          placeholder="Enter monthly income"
          {...register("coIncome", { required: "Income is required" })}
          style={inputStyle}
        />
        {errors.coIncome && <p style={errorStyle}>{errors.coIncome.message}</p>}
      </div>

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
        ℹ️ Adding a co-applicant may improve your loan approval chances
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
          type="button"
          onClick={prev}
          style={secondaryBtn}
        >
          Back
        </button>

        <button style={primaryBtn}>
          Continue
        </button>
      </div>
    </form>
  );
}

/* 🔥 Reusable styles */

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: 10,
  border: "1.5px solid #e5e7eb",
  marginTop: 6,
  fontSize: 14,
};

const errorStyle = {
  fontSize: 12,
  color: "#dc2626",
  marginTop: 4,
};

const primaryBtn = {
  padding: "13px",
  borderRadius: 12,
  background: "#185FA5",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "13px",
  borderRadius: 12,
  background: "#fff",
  border: "1.5px solid #e5e7eb",
  cursor: "pointer",
};

export default Step6;