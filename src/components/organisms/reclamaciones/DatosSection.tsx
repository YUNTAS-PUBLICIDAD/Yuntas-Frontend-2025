import React from 'react'
import Text from '@/components/atoms/Text'
import Banner from '@/components/atoms/Banner'
import DividerLine from '@/components/atoms/DividerLine'
import ReclamosForm from '@/components/organisms/reclamaciones/ReclamosForm'
import TextTitulo from '@/components/atoms/TextTitulo'
const DatosSection = () => {

  return (
    <section>
      <div className="w-full bg-gradient-to-r from-[#0a1a3a] via-[#0f2c5c] to-[#20838f] py-6 md:py-12 px-6 text-center shadow-sm">
        <TextTitulo
          variant="caption"
          className="text-white font-black text-2xl sm:text-3xl md:text-4xl tracking-tight uppercase">
          RECLAMACIONES
        </TextTitulo>
      </div>
      <ReclamosForm/>
    </section>
  )
}

export default DatosSection
