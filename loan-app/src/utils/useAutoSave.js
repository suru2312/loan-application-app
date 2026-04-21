import { useEffect } from "react";

const useAutoSave = (formData, updateFormData) => {
  // SAVE every 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("loanForm", JSON.stringify(formData));
    }, 5000);

    return () => clearInterval(interval);
  }, [formData]);

  // LOAD on start
  useEffect(() => {
    const saved = localStorage.getItem("loanForm");
    if (saved) {
      updateFormData(JSON.parse(saved));
    }
  }, []);
};

export default useAutoSave;