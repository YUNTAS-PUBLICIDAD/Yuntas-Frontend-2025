 
 type BeneficioItemProps = {
  title?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onUrl?: () => void;
  onProduct?: () => void;
};

 const BeneficioItem = ({ name, value, onChange, onUrl, onProduct, title}: BeneficioItemProps) => (
  <div className="relative mb-4 p-4 bg-white rounded border">
    <small className="text-gray-500">{title}</small>
    <textarea  className="border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#23C1DE] focus:border-transparent transition-all rounded px-3 py-2 w-full pr-20"
      name={name} value={value} 
      onChange={onChange}
      rows={3}/>
    <div className="absolute top-12 right-6 flex gap-2">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full shadow-md"
        type="button"
        onClick={onUrl}>🔗</button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-full shadow-md"
        type="button"
        onClick={onProduct}>🛒</button>
    </div>
  </div>
);
export default BeneficioItem;