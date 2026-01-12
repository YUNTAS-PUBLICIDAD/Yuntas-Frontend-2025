import { useState, useEffect, useRef } from "react";
import PopupContainer from "@/components/atoms/PopContainer";
import PopupImage from "@/components/molecules/producto/PopUp/PopUpImage";
import PopupHeader from "@/components/molecules/producto/PopUp/PopUpHeader";
import PopupForm from "@/components/molecules/producto/PopUp/PopupForm";
import imagenPopup from "@/assets/inicio/Popup/yuleLove.webp";
import CloseButton from "@/components/atoms/CloseButton";
import axios from "@/config/api.config"; //  usa tu instancia axios

interface ProductoPopupProps {
  delay?: number;
}

const InicioPopup: React.FC<ProductoPopupProps> = ({ delay = 5000 }) => {
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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

  //  FUNCIÓN REAL DE ENVÍO
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});

    // Validación frontend mínima
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "El nombre es obligatorio";
    if (!formData.email) newErrors.email = "El correo es obligatorio";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post("/leads", {
        name: formData.name,
        email: formData.email, //  backend espera "correo"
        phone: formData.phone,
      });

      // Reset + cerrar popup
      setFormData({ name: "", phone: "", email: "" });
      closeModal();
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <PopupContainer closing={closing} ref={modalRef}>
        <CloseButton
          onClick={closeModal}
          className="absolute top-4 right-4 z-50 text-gray-500 hover:text-gray-700 p-2"
        >
          ✕
        </CloseButton>

        <PopupImage src={imagenPopup} />

        <div className="w-full sm:w-[40%] p-4 flex flex-col justify-center">
          <PopupHeader title="¡Un detalle que cambia todo!" />
          <div className="pt-8">
            <PopupForm
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit} 
              buttonText="Empieza a brillar"
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </PopupContainer>
    </div>
  );
};

export default InicioPopup;
