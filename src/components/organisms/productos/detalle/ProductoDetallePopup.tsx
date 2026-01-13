'use client';

import ProductoPopup from "../popupInicial/ProductoPopup";

interface Props {
  imgSrc: string;
  productId: number; //  NUEVO
}

export default function ProductoDetallePopup({ imgSrc, productId }: Props) {
  return (
    <ProductoPopup
      delay={5000}
      imgSrc={imgSrc}
      productId={productId} //  PASA ID
    />
  );
}
