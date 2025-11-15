import React from 'react'
type selectProps={
    options:string[],
}
const Select = ({options}:selectProps) => {

  return (
    <select value={""} className='bg-[#CFD2D2] rounded-xl w-[400px] px-4 py-2'>
        {options.map((value,index)=>(
            <option key={`${value}${index}`} value={value}>{value}</option>
        ))}
    </select>
  )
}

export default Select