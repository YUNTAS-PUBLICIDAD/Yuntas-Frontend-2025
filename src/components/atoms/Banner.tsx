import React from 'react'
type BannerProps={
    children:React.ReactNode,
    color:string
}
const Banner = ({children,color='bg-[#23C1DE]'}:BannerProps) => {
  return (
    <div className={`w-full h-[]`}  >
      {children}</div>
  )
}

export default Banner