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
        
        className={`py-2 pl-4 cursor-pointer transition-all border-l-4 ${active ? "border-cyan-400 bg-cyan-50" : "border-transparent hover:border-gray-300"}`}>
        <Text className={`${active ? 'font-semibold text-black' : 'text-gray-600'}`}>{nombre} ({count})</Text>
    </div>
  )
}

export default CategoriaSelect