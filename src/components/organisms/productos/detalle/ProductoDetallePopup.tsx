'use client'

import ProductoPopup from "../popupInicial/ProductoPopup"

interface ProductoPopupProps {
  imgSrc: string;
}


export default function ProductoDetallePopup({ imgSrc }: ProductoPopupProps) {
  return (
    <>
      <ProductoPopup delay={5000} imgSrc={imgSrc} />
    </>
  )
}
