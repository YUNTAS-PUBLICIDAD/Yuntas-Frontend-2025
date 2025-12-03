import { useState, useEffect, useRef } from "react";
import PopupContainer from "@/components/atoms/PopContainer";
import PopupImage from "@/components/molecules/producto/PopUp/PopUpImage";
import PopupHeader from "@/components/molecules/producto/PopUp/PopUpHeader";
import PopupForm from "@/components/molecules/producto/PopUp/PopupForm";
import imagenPopup from "@/assets/productos/popup/Productos.webp";
import CloseButton from "@/components/atoms/CloseButton";

interface ProductoPopupProps {
  delay?: number;
}

const ProductoPopup: React.FC<ProductoPopupProps> = ({ delay = 5000 }) => {
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setShow(false);
      setClosing(false);
    }, 100);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <PopupContainer closing={closing} ref={modalRef}>
        {/* Botón de cierre en esquina absoluta */}
        <CloseButton
          onClick={closeModal}
          className="absolute top-4 right-4 z-50 text-gray-500 hover:text-gray-700 p-2"
        >
          ✕
        </CloseButton>

        <PopupImage src={imagenPopup} />

        <div className="w-full sm:w-[40%] p-4 flex flex-col justify-center">
          <PopupHeader title="¡Tu marca brillando como se merece!" />
          <div className="pt-8">
            <PopupForm
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={() => {}}
              buttonText="Explorar opciones"
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </PopupContainer>
    </div>
  );
};

export default ProductoPopup;
