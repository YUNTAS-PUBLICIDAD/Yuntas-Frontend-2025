import HeroSection from "@/components/organisms/inicio/HeroSection";
import InnovacionSection from "@/components/organisms/inicio/InnovacionSection";
import ProjectsCarousel from "@/components/organisms/inicio/ProjectsCarousel";
import TestimonialsSection from "@/components/organisms/inicio/TestimonialsSection";
import ChatbotWidget from "@/components/organisms/ChatbotWidget";

import DynamicPopup from "@/components/molecules/DynamicPopup"; 

import { sourceData } from "@/data/popup/sourceData";
import { imagenes } from "@/data/imagenes";
import { getPublicPopupService } from "@/services/popupService";
import { Popup as PopupType } from "@/types/admin/popup";

const BACKEND_URL = (process.env.NEXT_PUBLIC_URL || "http://localhost:8000").replace(/\/$/, "");

// Se agregó  'async' a la función principal
export default async function HomePage() {
  
  //nueva variable para almacenar el popup, sin usar 'useState'
  let dynamicPopup: PopupType | null = null;

  // petición directa al servidor, sin usar 'useEffect'
  try {
    const result = await getPublicPopupService('inicio');
    if (result.success && result.data && result.data.active === true) {
      dynamicPopup = result.data;
    }
  } catch (error) {
    console.error("Error al obtener el popup dinámico:", error);
  }

  const getImgUrl = (imgObj: any) => {
    return imgObj?.image ? `${BACKEND_URL}${imgObj.image.startsWith('/') ? '' : '/'}${imgObj.image}` : "";
  };

  const desktopLeftImg = dynamicPopup?.images?.find(img => img.device === 'desktop' && img.slot === 'left');
  const desktopRightImg = dynamicPopup?.images?.find(img => img.device === 'desktop' && img.slot === 'right');
  const mobileCenterImg = dynamicPopup?.images?.find(img => img.device === 'mobile' && img.slot === 'center');

  return (
    <main>
      <HeroSection />
      <InnovacionSection />
      <ProjectsCarousel />
      <TestimonialsSection />
      
      {/* Ya no se valida si está cargando (!isLoadingPopup) */}
      {dynamicPopup ? (
        // EL NUEVO COMPONENTE DYNAMIC POPUP
        <DynamicPopup
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
        <DynamicPopup
          desktopImgSrc={imagenes.inicio.popup.src}
          textImgSrc=""
          mobileImgSrc={imagenes.inicio.popup.src}
          imgAlt={imagenes.inicio.popup.alt}
          title="¡Un detalle que cambia todo!"
          buttonText="Empieza a brillar"
          sourceId={sourceData.INICIO}
        />
      )}
      <ChatbotWidget />
    </main>
  );
}