import React from 'react'
type BannerProps={
    children:React.ReactNode,
    color?:string,
    className?:string
}
const Banner = ({className,children,color='bg-[#23C1DE]'}:BannerProps) => {
  return (
    <div className={`w-full h-[150px] flex justify-center items-center ${color} ${className}`}  >
      {children}</div>
  )
}

export default Banner