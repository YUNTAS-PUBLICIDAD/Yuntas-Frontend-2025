import { useId } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ error, className = "", id, ...props }) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="w-full flex flex-col items-center relative">
      <input
        {...props}
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`w-[90%] px-4 py-2 rounded-lg bg-[#EBEBEB] border-0 text-sm
          font-montserrat focus:ring-2
          ${error ? "ring-red-400" : "focus:ring-blue-500/20"} ${className}`}
      />
      {error && (
        <p
          id={errorId}
          className="text-red-500 text-[9px] font-medium leading-none absolute top-[100%] mt-0.5 left-0 right-0 text-center pointer-events-none"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;