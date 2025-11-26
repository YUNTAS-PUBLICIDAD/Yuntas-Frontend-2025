import React from 'react'
const sizeMap={
  normal:"h-[150px]",
  small:"h-[100px]"
}
type BannerProps={
    size?:"normal"|"small"
    children:React.ReactNode,
    color?:string,
    className?:string
}
const Banner = ({className,size="normal",children,color='bg-[#23C1DE]'}:BannerProps) => {
  return (
    <div className={`w-full  flex justify-center items-center ${color} ${className} ${sizeMap[size]}`}  >
      {children}</div>
  )
}

export default Banner