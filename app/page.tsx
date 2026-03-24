'use client'
import { useEffect, useState } from "react";
import HeroSection from "@/components/organisms/inicio/HeroSection";
import InnovacionSection from "@/components/organisms/inicio/InnovacionSection";
import ProjectsCarousel from "@/components/organisms/inicio/ProjectsCarousel";
import TestimonialsSection from "@/components/organisms/inicio/TestimonialsSection";
import Popup from "@/components/molecules/Popup";
import { sourceData } from "@/data/popup/sourceData";
import { imagenes } from "@/data/imagenes";
import { getPublicPopupService } from "@/services/popupService";
import { Popup as PopupType } from "@/types/admin/popup"

const BACKEND_URL = (process.env.NEXT_PUBLIC_URL || "http://localhost:8000").replace(/\/$/, "");

export default function HomePage() {
  const [dynamicPopup, setDynamicPopup] = useState<PopupType | null>(null);
  const [isLoadingPopup, setIsLoadingPopup] = useState(true);

  useEffect(() => {
    const fetchPopup = async () => {
      try {
        const result = await getPublicPopupService('inicio');
        
        // Verifica estrictamente que la petición fue exitosa, trae datos y está activo
        if (result.success && result.data && result.data.active === true) {
          setDynamicPopup(result.data);
        } else {
          setDynamicPopup(null);
        }
      } catch (error) {
        console.error("Error al obtener el popup dinámico:", error);
        setDynamicPopup(null);
      } finally {
        setIsLoadingPopup(false);
      }
    };

    fetchPopup();
  }, []);

  // Extraemos la información de la imagen de escritorio ANTES de renderizar
  // Así evitamos ensuciar el JSX 
  const desktopLeftImg = dynamicPopup?.images?.find(img => img.device === 'desktop' && img.slot === 'left');
  const popupImgSrc = desktopLeftImg?.image 
    ? `${BACKEND_URL}${desktopLeftImg.image.startsWith('/') ? '' : '/'}${desktopLeftImg.image}`
    : "";
  const popupImgAlt = desktopLeftImg?.alt || "";
  const popupImgTitle = desktopLeftImg?.title || "";

  return (
    <main>
      <HeroSection />
      <InnovacionSection />
      <ProjectsCarousel />
      <TestimonialsSection />
      
      {!isLoadingPopup && (
        dynamicPopup ? (
          // POPUP DINÁMICO
          <Popup
            imgSrc={popupImgSrc}
            imgTitle={popupImgTitle}
            imgAlt={popupImgAlt}
            title={dynamicPopup.title}
            buttonText={dynamicPopup.button_text}
            buttonColor={dynamicPopup.button_color || "#6DE1E3"}
            sourceId={sourceData.INICIO}
            // Multiplica por 1000 para pasar de segundos a milisegundos
            delay={(dynamicPopup.delay_seconds || 5) * 1000} 
          />
        ) : (
          // POPUP ESTÁTICO (Fallback)
          <Popup
            imgSrc={imagenes.inicio.popup.src}
            imgTitle={imagenes.inicio.popup.title}
            imgAlt={imagenes.inicio.popup.alt}
            title="¡Un detalle que cambia todo!"
            buttonText="Empieza a brillar"
            sourceId={sourceData.INICIO}
            // delay (usará los 5000ms por defecto)
          />
        )
      )}
    </main>
  );
}