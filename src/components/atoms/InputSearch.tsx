import React from 'react'

type InputSearchProps={
    placeholder:string,
    value?:string,
    className?:string,
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void

}
const InputSearch = ({placeholder,value,className,onChange}:InputSearchProps) => {
  return (
    <input 
        type='search'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 outline-none ${className}`}
    />
  )
}

export default InputSearch