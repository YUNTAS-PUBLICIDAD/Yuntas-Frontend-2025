import React from 'react'
import { StaticImageData } from 'next/image'
import ProductoCard from '../molecules/producto/ProductoCard'
const ImgVariant={
    normal:"",
    blogCard:"w-[400px] h-[300px] rounded-tr-3xl rounded-tl-3xl",
    productoCard:"w-[450px] h-[330px] rounded-tr-xl rounded-tl-xl",
}
type ImgProps={
    src:string,
    variant?:"blogCard"|"productoCard"|"normal",
    classname?:string
}
const Img = ({src, variant='normal',classname}:ImgProps) => {
  return (
    <img src={src} className={` ${classname} ${ImgVariant[variant]}`}/>
  )
}

export default Img