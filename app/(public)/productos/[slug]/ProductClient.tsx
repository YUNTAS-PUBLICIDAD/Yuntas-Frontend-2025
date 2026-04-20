'use client';

import { useParams } from 'next/navigation';
import HeroSection from "@/components/organisms/productos/detalle/HeroSection";
import ListaDetalleSection from "@/components/organisms/productos/detalle/ListaDetalleSection";
import InformacionSection from "@/components/organisms/productos/detalle/InformacionSection";
import CotizaSection from "@/components/organisms/productos/detalle/CotizaSection";
import Popup from '@/components/molecules/Popup';
import { useProductos } from "@/hooks/useProductos";
import { sourceData } from "@/data/popup/sourceData";
import { useEffect, useState } from "react";
import { ImageProductoSlot, Producto } from '@/types/admin/producto';
import { imageProductoSlots } from '@/types/admin/producto';
import { getPopupsService, getPublicPopupService } from '@/services/popupService';
import { Popup as PopupConfig } from '@/types/admin/popup';

interface ProductClientProps {
    initialProduct?: Producto | null;
}

const popupSlots = [
  imageProductoSlots.POPUP_LEFT,
  imageProductoSlots.POPUP_RIGHT,
  imageProductoSlots.POPUP_MOBILE
] as const;

export function ProductClient({ initialProduct }: ProductClientProps) {
    const params = useParams();
    const [isMobile, setIsMobile] = useState(false);
    const [popup, setPopup] = useState<PopupConfig | null>(null);
    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 768);
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
    }, []);

    const slug = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : null;

    const { getProductoBySlug, producto: hookProducto, isLoading, error } = useProductos();

    // Usar el producto inicial si está disponible, de lo contrario usar el del hook
    const displayProducto = hookProducto || initialProduct;

    useEffect(() => {
        // Solo cargar si no tenemos el producto inicial o si el slug cambió
        if (slug && (!initialProduct || initialProduct.slug !== slug)) {
            getProductoBySlug(slug);
        }
    }, [slug, getProductoBySlug, initialProduct]);

    useEffect(() => {
      const fetchPopup = async () => {
        const res = await getPublicPopupService('product-detail');

        if(res.success){
          setPopup(res.data || null)
        }
      };
      fetchPopup();
    }, []);

    if (!slug && !displayProducto) {
        return <div className="flex justify-center items-center h-screen">URL no válida</div>;
    }

    const imgHero = displayProducto?.gallery.find(e => e.slot === imageProductoSlots.HERO);
    const imgSpecs = displayProducto?.gallery.find(e => e.slot === imageProductoSlots.SPECS);
    const imgBene = displayProducto?.gallery.find(e => e.slot === imageProductoSlots.BENEFITS);
    // const imgPopups = displayProducto?.gallery.find(e => e.slot === imageProductoSlots.POPUPS);
    // const popupImages = displayProducto?.gallery.filter(e =>
    //   [
    //     imageProductoSlots.POPUP_LEFT,
    //     imageProductoSlots.POPUP_RIGHT,
    //     imageProductoSlots.POPUP_MOBILE
    //     ].includes(e.slot as typeof popupSlots[number])) || [];

    const isPopupSlot = (slot: ImageProductoSlot): slot is typeof popupSlots[number] => {
     return popupSlots.includes(slot as any);
    }

    const popupImages = displayProducto?.gallery?.filter(e => isPopupSlot(e.slot)) || [];

   const popupLeft = popupImages.find(e => e.slot === imageProductoSlots.POPUP_LEFT);
   const popupRight = popupImages.find(e => e.slot === imageProductoSlots.POPUP_RIGHT);
   const popupMobile = popupImages.find(e => e.slot === imageProductoSlots.POPUP_MOBILE);

    // const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const isDesktopPopup = (slot: ImageProductoSlot): slot is "PopupLeft" | "PopupRight" => {
      return [
        imageProductoSlots.POPUP_LEFT,
        imageProductoSlots.POPUP_RIGHT
        ].includes(slot as any);
    }

    // const selectedPopup = popupImages.find(e => isMobile ? e.slot === imageProductoSlots.POPUP_MOBILE : isDesktopPopup(e.slot));

    return (
        <>
            {isLoading && !displayProducto && <div className="flex justify-center items-center h-screen">Cargando producto...</div>}

            {
                displayProducto && (
                    <>
                        <HeroSection
                            productName={displayProducto?.name || ""}
                            backgroundImage={imgHero?.url || ""}
                            imageTitle={imgHero?.title || `${displayProducto.name} - Yuntas Publicidad`}
                            imageAlt={imgHero?.alt || `${displayProducto.name} - Yuntas Publicidad`}
                        />
                        <ListaDetalleSection
                            text="ESPECIFICACIONES"
                            listItems={displayProducto?.specifications || []}
                            imageSrc={imgSpecs?.url || ""}
                            imageTitle={imgSpecs?.title || "Especificaciones del producto"}
                            imageAlt={imgSpecs?.alt || "Especificaciones del producto"}
                        />
                        <InformacionSection info={displayProducto?.description || ""} />
                        <ListaDetalleSection
                            text="BENEFICIOS"
                            listItems={displayProducto?.benefits || []}
                            imageSrc={imgBene?.url || ""}
                            imageTitle={imgBene?.title || "Beneficios del producto"}
                            imageAlt={imgBene?.alt || "Beneficios del producto"}
                            reverse={true}
                        />
                        <CotizaSection />

                        {
                          isMobile ? (
                        <Popup
                            isMobile={isMobile}
                            // imgSrc={popupMobile?.url || ""}
                            // imgTitle={popupMobile?.title || "Cotiza tu producto"}
                            // imgAlt={popupMobile?.alt || "Cotiza tu producto"}
                            mobileImage={popupMobile}
                            title={popup?.title ??"¡Tu marca brillando como se merece!"}
                            buttonText={popup?.button_text ?? "Explorar opciones"}
                            buttonColor={popup?.button_color}
                            delay={(popup?.delay_seconds ?? 3)* 1000}
                            productId={displayProducto?.id}
                            sourceId={sourceData.PRODUCTO_DETALLE} // source id para "Producto detalle"
                        />
                          ): (
                            (popupLeft || popupRight) && (
                              <Popup
                              // imgSrc={popupMobile?.url || ""}
                              // imgTitle={popupMobile?.title || "Cotiza tu producto"}
                              // imgAlt={popupMobile?.alt || "Cotiza tu producto"}
                              leftImage={popupLeft}
                              rightImage={popupRight}
                              title={ popup?.title ?? "¡Tu marca brillando como se merece!"}
                              buttonColor={popup?.button_color}
                              delay={(popup?.delay_seconds ?? 3) * 1000}
                              buttonText={popup?.button_text ?? "Explorar opciones"}
                              productId={displayProducto?.id}
                              sourceId={sourceData.PRODUCTO_DETALLE} // source id para "Producto detalle"

                              />
                            )
                          )
                        }
                    </>
                )
            }

            {error && !displayProducto && <div className="flex justify-center items-center h-screen">Producto no encontrado</div>}
        </>
    );
}
