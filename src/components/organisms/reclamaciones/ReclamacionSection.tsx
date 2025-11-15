import React from 'react'
import InputField from '@/components/molecules/inputsField/InputField'
import Text from '@/components/atoms/Text'
import SelectField from '@/components/molecules/inputsField/SelectField'
const ReclamacionSection = () => {
  const productos=[
    "producto1",
    "producto2"
  ]
  return (
    <div className='flex flex-col gap-10 items-center'>
        <Text color='black' variant='subtitle'>Informacion de reclamo</Text>
        <InputField 
            textLabel='Fecha de compra' 
            inputPlaceholder='06/03/2025'
            size='xxl'/>
        <SelectField textLabel='Productos' options={productos}></SelectField>
        <InputField 
            textLabel='Detalle de la reclamacion' 
            inputPlaceholder='Detalle su reclamo aqui'
            size='xxxl'/>
        <InputField 
            textLabel='Monto reclamado' 
            inputPlaceholder='s/.999'
            size='xl'/>
    </div>
  )
}

export default ReclamacionSection