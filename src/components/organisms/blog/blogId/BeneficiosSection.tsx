import React from 'react'
import { Blog } from '@/types/blog'
import Text from '@/components/atoms/Text'
import Img from '@/components/atoms/Img'
import InfoCard from '@/components/molecules/InfoCard'
type BeneficiosSectionProps={
    data:Blog
}
const BeneficiosSection = ({data}:BeneficiosSectionProps) => {
  return (
    <section className='flex flex-col gap-20 px-5 pb-10'>
        <Text  variant='subtitle' className='text-center font-medium'>{data.beneficio_principal}</Text>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <Img src={data.galeria[1]} classname=''></Img>
            <div className='flex flex-col gap-10 justify-center'>
                <Text variant='caption' className='uppercase font-medium'>Beneficios Clave</Text>
                {data.beneficios.map(e=>(
                    <InfoCard key={e} className='' text={e}/>
                ))}
            </div>    
        </div>
    </section>
  )
}

export default BeneficiosSection