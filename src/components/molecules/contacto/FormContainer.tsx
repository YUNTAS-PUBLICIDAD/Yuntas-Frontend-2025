import React from "react";

interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto bg-[#E2F6F6] rounded-3xl p-12">
      {children}
    </div>
  );
};

export default FormContainer;
