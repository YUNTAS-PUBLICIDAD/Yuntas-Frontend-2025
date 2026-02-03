import React from "react";

interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto bg-[#E2F6F6] rounded-[2.5rem] p-6 md:p-16 shadow-lg border border-[#D1EAEA]">
      {children}
    </div>
  );
};

export default FormContainer;
