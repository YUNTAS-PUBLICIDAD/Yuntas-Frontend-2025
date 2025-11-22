import React from 'react'
type ItemPagination={
    children:React.ReactNode
    classname?:string,
    onClick?:()=>void,
    active?:boolean
}

const ItemPagination = ({children,classname,onClick,active}:ItemPagination) => {
  return (
    <div className={`rounded-full size-8 font-bold  text-black flex justify-center items-center cursor-pointer hover:bg-gray-300 hover:text-black
 ${classname} ${active?'bg-[#0B0B1F] text-white':''}`  } onClick={onClick}>
        {children}
    </div>
  )
}

export default ItemPagination