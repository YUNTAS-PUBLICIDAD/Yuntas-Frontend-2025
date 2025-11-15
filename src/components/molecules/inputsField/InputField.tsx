import React from 'react'
import Label from '@/components/atoms/Label'
import Input from '@/components/atoms/Input'

type inputFieldProps={
    textLabel:string,
    inputPlaceholder:string
    size:"xxl"|"xl"|"xxxl"
}
const InputField = ({textLabel,inputPlaceholder,size}:inputFieldProps) => {
  return (
    <div className='flex flex-col'>
        <Label >{textLabel}</Label>
        <Input placeHolder={inputPlaceholder} size={size}></Input>
    </div>
  )
}

export default InputField