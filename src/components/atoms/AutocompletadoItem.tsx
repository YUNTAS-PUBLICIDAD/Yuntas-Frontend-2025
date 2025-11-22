import React from 'react'
import { FaSearch } from "react-icons/fa";

type autocompletadoItemProps={
    nombre:string
}
const AutocompletadoItem = ({nombre}:autocompletadoItemProps) => {
  return (
    <li className='flex gap-3 items-center px-2 border-b-2 border-cyan-200'>
        <FaSearch/>
        {nombre}
    </li>
  )
}

export default AutocompletadoItem