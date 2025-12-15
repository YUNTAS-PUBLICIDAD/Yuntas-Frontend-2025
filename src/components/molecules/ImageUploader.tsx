type Props = {
  name: string;        // imagen_principal | imagenes[]
  altName: string;     // imagen_principal_alt | imagenes_alts[]
  required?: boolean;
  multiple?: boolean;
  small:string
};

const ImageUploader = ({
  name,
  small,
  altName,
  required = false,
  multiple = false,
}: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <input 
        type="file"
        name={name}
        accept="image/*"
        multiple={multiple}
        required={required}
        className="file:bg-green-100 file:px-3 file:py-2 file:rounded-lg 
          file:border-0 border border-gray-300 rounded-lg p-2 w-full"
      />

      <small className="text-gray-500">{small}</small>
      <input
        type="text"
        name={altName}
        placeholder="Texto ALT (SEO)"
        className="border border-gray-300 rounded-lg w-full pl-2 py-2 bg-transparent"
      />

    </div>
  );
};

export default ImageUploader;
