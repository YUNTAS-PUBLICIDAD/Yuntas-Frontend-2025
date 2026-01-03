interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ error, ...props }) => (
  <div className="w-full flex flex-col items-center">
    <input
      {...props}
      className={`w-[90%] px-4 py-2 rounded-lg bg-[#EBEBEB] border-0 text-sm
        font-montserrat focus:ring-2
        ${error ? "ring-red-400" : "focus:ring-blue-500/20"}`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default InputField;