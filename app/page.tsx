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
            imgSrc={
              typeof dynamicPopup.image === 'string' 
                ? `${BACKEND_URL}${dynamicPopup.image.startsWith('/') ? '' : '/'}${dynamicPopup.image}` 
                : ""
            }
            imgTitle={dynamicPopup.image_title || ""}
            imgAlt={dynamicPopup.image_alt || ""}
            title={dynamicPopup.title}
            buttonText={dynamicPopup.button_text}
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
