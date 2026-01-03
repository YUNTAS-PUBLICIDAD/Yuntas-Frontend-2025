interface FormFieldGroupProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
}

const FormFieldGroup: React.FC<FormFieldGroupProps> = ({ children, onSubmit }) => (
  <form onSubmit={onSubmit} className="space-y-3 flex flex-col items-center w-full">
    {children}
  </form>
);

export default FormFieldGroup;
