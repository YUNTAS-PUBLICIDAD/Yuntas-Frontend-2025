import React from 'react'
import Text from '@/components/atoms/Text'
type CategoriaSelectProps={
    nombre:string,
    count:number,
    active?:boolean,
    onClick?:()=>void

}
const CategoriaSelect = ({nombre,count,active,onClick}:CategoriaSelectProps) => {
  return (
    <div
        onClick={onClick} 
        className={`px-2 py-2  cursor-pointer  ${active && "bg-[#6DD0DB33] border-2 border-[#23C1DE] rounded-lg"}  `}>
        <Text>{nombre} ({count})</Text>
    </div>
  )
}

export default CategoriaSelect