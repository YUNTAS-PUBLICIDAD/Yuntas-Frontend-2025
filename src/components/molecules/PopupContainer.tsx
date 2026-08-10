'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import DynamicPopup from "@/components/molecules/DynamicPopup";
import { getPublicPopupService } from "@/services/popupService";
import { Popup as PopupType } from "@/types/admin/popup";
import { imagenes } from "@/data/imagenes";
import { sourceData } from "@/data/popup/sourceData";

const BACKEND_URL = (process.env.NEXT_PUBLIC_URL || "http://localhost:8000").replace(/\/$/, "");

const getImgUrl = (imgObj: any, updatedAt?: string) => {
  if (!imgObj?.image) return "";
  const base = `${BACKEND_URL}${imgObj.image.startsWith('/') ? '' : '/'}${imgObj.image}`;
  return updatedAt ? `${base}?v=${new Date(updatedAt).getTime()}` : base;
};

export default function PopupContainer() {
  const [dynamicPopup, setDynamicPopup] = useState<PopupType | null>(null);
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;
    setLoaded(false);

    getPublicPopupService('inicio')
      .then((result) => {
        if (!mounted) return;
        if (result.success && result.data && result.data.active === true) {
          setDynamicPopup(result.data);
        } else {
          setDynamicPopup(null);
        }
      })
      .catch((error) => {
        console.error("Error al obtener el popup dinámico:", error);
        setDynamicPopup(null);
      })
      .finally(() => {
        if (mounted) setLoaded(true);
      });

    return () => { mounted = false; };
  }, [pathname]);

  // Evita parpadeo mientras se resuelve la petición
  if (!loaded) return null;

  if (dynamicPopup) {
    const desktopLeftImg = dynamicPopup.images?.find(img => img.device === 'desktop' && img.slot === 'left');
    const desktopRightImg = dynamicPopup.images?.find(img => img.device === 'desktop' && img.slot === 'right');
    const mobileCenterImg = dynamicPopup.images?.find(img => img.device === 'mobile' && img.slot === 'center');

    return (
      <DynamicPopup
        desktopImgSrc={getImgUrl(desktopLeftImg)}
        textImgSrc={getImgUrl(desktopRightImg)}
        mobileImgSrc={getImgUrl(mobileCenterImg)}
        imgAlt={desktopLeftImg?.alt || "Popup Yuntas"}
        title={dynamicPopup.title}
        buttonText={dynamicPopup.button_text}
        buttonColor={dynamicPopup.button_color || "#7C29E3"}
        sourceId={sourceData.INICIO}
        delay={(dynamicPopup.delay_seconds || 5) * 1000}
      />
    );
  }

  // Fallback estático
  return (
    <DynamicPopup
      desktopImgSrc={imagenes.inicio.popup.src}
      textImgSrc=""
      mobileImgSrc={imagenes.inicio.popup.src}
      imgAlt={imagenes.inicio.popup.alt}
      title="¡Un detalle que cambia todo!"
      buttonText="Empieza a brillar"
      sourceId={sourceData.INICIO}
    />
  );
}