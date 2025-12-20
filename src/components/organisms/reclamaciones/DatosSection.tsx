import React from 'react'
import Text from '@/components/atoms/Text'
import Banner from '@/components/atoms/Banner'
import CircleNumber from '@/components/molecules/reclamaciones/CircleNumber'
import Button from '@/components/atoms/Button'
import DividerLine from '@/components/atoms/DividerLine'
import DatosBlock from '@/components/molecules/reclamaciones/DatosBlock'
import ReclamoBlock from '@/components/molecules/reclamaciones/ReclamoBlock'
const DatosSection = () => {

  return (
    <section>
      <DividerLine className="relative z-[1]" />
      <Banner className="relative z-[5]">
        <Text variant='banner' color='white' className='font-bold text-xl'>
          LIBRO DE RECLAMACIONES
        </Text>
      </Banner>

      <form className='flex flex-col gap-12 px-6 md:px-16 py-10 max-w-4xl mx-auto'>

        {/* seccion donde se pone los datos */}
        <div className='flex items-center gap-4'>
          <CircleNumber number="1" />
          <Text color='black' variant='subtitle'>
            Datos de la persona que presenta el reclamo
          </Text>
        </div>
        <DatosBlock/>
        
        {/*seccion donde se detalla el reclamo */}
        <div className='flex items-center gap-4'>
          <CircleNumber number="2" />
          <Text color='black' variant='subtitle'>
            Información de reclamo
          </Text>
        </div>
        <ReclamoBlock/>
        <Button 
          size='md'
          className='w-full md:w-[344px] rounded-3xl text-white mx-auto bg-[#23C1DE]'>
          Enviar
        </Button>

      </form>
    </section>
  )
}

export default DatosSection
