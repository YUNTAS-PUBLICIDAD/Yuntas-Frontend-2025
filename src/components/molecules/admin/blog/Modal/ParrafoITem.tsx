 
 type ParrafoItemProps = {
  placeholder?:string
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onUrl?: () => void;
  onProduct?: () => void;
};

 const ParrafoItem = ({ name, value, onChange, onUrl, onProduct,placeholder }: ParrafoItemProps) => (
  <div className="relative mb-4 bg-trasparent rounded border">
    <textarea  className="p-3 rounded w-ful bg-transparent w-full  border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#23C1DE] focus:border-transparent transition-all"
      name={name} value={value} 
      onChange={onChange}
      rows={5}
      placeholder={placeholder}/>
    <div className="absolute top-2 right-2 flex gap-2">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full shadow-md"
        type="button"
        onClick={onUrl}>🔗 Url</button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-full shadow-md"
        type="button"
        onClick={onProduct}>🛒 Producto</button>
    </div>
  </div>
);
export default ParrafoItem;