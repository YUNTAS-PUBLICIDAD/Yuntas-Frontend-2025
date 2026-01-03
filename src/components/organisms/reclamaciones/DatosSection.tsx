import React from 'react'
import Text from '@/components/atoms/Text'
import Banner from '@/components/atoms/Banner'
import DividerLine from '@/components/atoms/DividerLine'
import ReclamosForm from '@/components/organisms/reclamaciones/ReclamosForm'
const DatosSection = () => {

  return (
    <section>
      <DividerLine className="relative z-[1]" />
      <Banner className="relative z-[5]">
        <Text variant='banner' color='white' className='font-bold text-xl'>
          LIBRO DE RECLAMACIONES
        </Text>
      </Banner>

      <ReclamosForm/>
    </section>
  )
}

export default DatosSection
