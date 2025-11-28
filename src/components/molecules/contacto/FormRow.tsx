import React from "react";

interface FormRowProps {
  children: React.ReactNode;
  columns?: 1 | 2;
}

const FormRow: React.FC<FormRowProps> = ({ children, columns = 2 }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4 max-w-3xl mx-auto`}>
      {children}
    </div>
  );
};

export default FormRow;
