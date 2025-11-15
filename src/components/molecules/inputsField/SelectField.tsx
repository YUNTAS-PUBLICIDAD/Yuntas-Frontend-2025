import React from 'react'
import Label from '@/components/atoms/Label'
import Select from '@/components/atoms/Select'
type selectFieldProps={
    options:string[],
    textLabel:string
}
const SelectField = ({options,textLabel}:selectFieldProps) => {
  return (
    <div className='flex flex-col '>
        <Label>{textLabel}</Label>
        <Select options={options}></Select>
    </div>
  )
}

export default SelectField