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

  // Función auxiliar para armar la URL de la imagen
  const getImgUrl = (imgObj: any) => {
    return imgObj?.image ? `${BACKEND_URL}${imgObj.image.startsWith('/') ? '' : '/'}${imgObj.image}` : "";
  };

  // Extraemos las 3 imágenes
  const desktopLeftImg = dynamicPopup?.images?.find(img => img.device === 'desktop' && img.slot === 'left');
  const desktopRightImg = dynamicPopup?.images?.find(img => img.device === 'desktop' && img.slot === 'right');
  const mobileCenterImg = dynamicPopup?.images?.find(img => img.device === 'mobile' && img.slot === 'center');

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
            desktopImgSrc={getImgUrl(desktopLeftImg)}
            textImgSrc={getImgUrl(desktopRightImg)}
            mobileImgSrc={getImgUrl(mobileCenterImg)}
            imgAlt={desktopLeftImg?.alt || "Popup Yuntas"}
            title={dynamicPopup.title}
            buttonText={dynamicPopup.button_text}
            buttonColor={dynamicPopup.button_color || "#6DE1E3"}
            sourceId={sourceData.INICIO}
            delay={(dynamicPopup.delay_seconds || 5) * 1000} 
          />
        ) : (
          // POPUP ESTÁTICO (Fallback)
          <Popup
            desktopImgSrc={imagenes.inicio.popup.src}
            textImgSrc=""
            mobileImgSrc={imagenes.inicio.popup.src}
            imgAlt={imagenes.inicio.popup.alt}
            title="¡Un detalle que cambia todo!"
            buttonText="Empieza a brillar"
            sourceId={sourceData.INICIO}
          />
        )
      )}
    </main>
  );
}