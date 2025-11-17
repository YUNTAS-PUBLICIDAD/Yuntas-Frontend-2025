import React from 'react'
type SelectProps={
    options:string[],
}
type LabelProps = {
  textLabel:string,
  colorLabel?: string;
};

type Props=LabelProps& SelectProps
const Select = ({options,textLabel,colorLabel="color-black"}:Props) => {

  return (
    <div className='flex flex-col gap-2'>
      <label className={` ${colorLabel}`}>{textLabel}</label>
      <select value={""} className='bg-[#CFD2D2] rounded-xl max-w-[1091px] w-full px-4 py-2'>
          {options.map((value,index)=>(
              <option key={`${value}${index}`} value={value}>{value}</option>
          ))}
      </select>
    </div>
  )
}

export default Select