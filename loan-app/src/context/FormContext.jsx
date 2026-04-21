import { createContext, useState, useEffect } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("loanForm");
    return saved ? JSON.parse(saved) : {};
  });

  const updateFormData = (newData) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  useEffect(() => {
    localStorage.setItem("loanForm", JSON.stringify(formData));
  }, [formData]);

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};