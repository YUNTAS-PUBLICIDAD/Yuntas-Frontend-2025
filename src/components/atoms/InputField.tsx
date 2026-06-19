interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ error, className = "", ...props }) => (
  <div className="w-full flex flex-col items-center relative">
    <input
      {...props}
      className={`w-[90%] px-4 py-2 rounded-lg bg-[#EBEBEB] border-0 text-sm
        font-montserrat focus:ring-2
        ${error ? "ring-red-400" : "focus:ring-blue-500/20"} ${className}`}
    />
    {error && (
      <p className="text-red-500 text-[9px] font-medium leading-none absolute top-[100%] mt-0.5 left-0 right-0 text-center pointer-events-none">
        {error}
      </p>
    )}
  </div>
);

export default InputField;