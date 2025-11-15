import React from 'react'
import InputField from '@/components/molecules/inputsField/InputField'
import Text from '@/components/atoms/Text'
import SelectField from '@/components/molecules/inputsField/SelectField'
const DatosSection = () => {
  return (
    <div className='flex flex-col gap-10  items-center'>
        <Text color='black' variant='subtitle'>Datos de la Persona que presenta el reclamo</Text>
        <div className='flex flex-col gap-5'>
            <InputField 
                textLabel='Nombre' 
                inputPlaceholder='ej: Juan' 
                size='xxl'/>
            <InputField 
                textLabel='Apellido' 
                inputPlaceholder='ej: Quispe' 
                size='xxl'/>
            <div className='flex gap-10 justify-between' >
                <SelectField 
                   textLabel='Tipo de Documento'
                   options={["DNI","Pasaporte"]}
                />
                <InputField 
                    textLabel='Numero de Documento' 
                    inputPlaceholder='ej: 123456789' 
                    size='xl'/>
            </div>
            <InputField 
                textLabel='Correo Electronico' 
                inputPlaceholder='ej: juan@quispe.gmail.com' 
                size='xxl'/>
            <InputField 
                textLabel='Telefono' 
                inputPlaceholder='ej: 987 654 321' 
                size='xxl'/>
        </div>
    </div>
  )
}

export default DatosSection