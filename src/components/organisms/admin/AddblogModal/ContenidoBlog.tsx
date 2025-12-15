import React, { useState } from 'react'
import BeneficioItem from '@/components/molecules/admin/blog/Modal/BeneficioItem'
import ParrafoItem from '@/components/molecules/admin/blog/Modal/ParrafoITem';
import Text from '@/components/atoms/Text';
type ContenidoBlogProp={
  beneficios:string[];
  setBeneficios:(beneficios:string[])=>void;
  parrafos:string[];
  setParrafos:(parrafos:string[])=>void;
}


const ContenidoBlog = ({beneficios,setBeneficios,parrafos,setParrafos}:ContenidoBlogProp) => {

  const handleChange=(e:React.ChangeEvent<HTMLTextAreaElement>,index:number)=>{
    const newBeneficios = [...beneficios];
    newBeneficios[index] = e.target.value;
    setBeneficios(newBeneficios);
  }

  const handleChangeParrafos=(e:React.ChangeEvent<HTMLTextAreaElement>,index:number)=>{
    const newParrafos = [...parrafos];
    newParrafos[index] = e.target.value;
    setParrafos(newParrafos);
  }
  return (
    <div className='bg-yellow-50 p-4 sm:p-6 rounded-lg border border-yellow-200'>
        <small className='text-gray-500 mb-4'>Párrafo 1 (Introducción) *</small>
        <ParrafoItem 
          placeholder='Excribe aqui la Introduccion del Blog...'
          name='parrafos[]'value={parrafos[0]} onChange={(e) => handleChangeParrafos(e, 0)}/>
        <div className='grid gap-2'>
          <Text>Lista Beneficios *</Text>
          <small className='text-gray-500'>3 beneficios requeridos. Cada beneficio aparecerá como un ítem en la lista.</small>
          <BeneficioItem title='Beneficio 1 *' name='beneficios[]'value={beneficios[0]} onChange={(e) => handleChange(e, 0)}/>
          <BeneficioItem title='Benficio 2 *' name='beneficios[]'value={beneficios[1]} onChange={(e) => handleChange(e, 1)}/>
          <BeneficioItem  title='Beneficio 3 *' name='beneficios[]'value={beneficios[2]} onChange={(e) => handleChange(e, 2)}/>
          
        </div>
        <small className='text-gray-500 mb-4'>Párrafo 2 (Conclusión/Testimonio) *</small>
        <ParrafoItem 
          placeholder='Excribe aqui la conclusion o testimonio del Blog...'
          name='parrafos[]'value={parrafos[1]} onChange={(e) => handleChangeParrafos(e, 1)}/>
    </div>
  )
}

export default ContenidoBlog
