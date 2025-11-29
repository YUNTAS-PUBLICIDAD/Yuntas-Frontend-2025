import React from 'react'
import Logo from '@/components/atoms/Logo'
import Text from '@/components/atoms/Text'
import InputText from '@/components/atoms/InputText'
import Button from '@/components/atoms/Button'
const FormSection = () => {
  return (
   <section className="
  bg-white/10 backdrop-blur-lg md:bg-gray-200
  rounded-3xl p-8 w-full max-w-md mx-auto mb-8
  border border-white/20
  flex flex-col justify-center gap-5 items-center
">
        <div className="flex flex-col items-center w-56">
            <Logo src="/logo.svg" size="xl" alt="Yuntas Publicidad" />
        </div>
        <Text variant='h2' className='font-bold text-white'>Bienvenido</Text>
        <form action="" className='flex flex-col gap-4 w-full items-center'>
          <InputText placeholder='Usuario' className='rounded-full ' type='text' />
          <InputText placeholder='Contraseña' className='rounded-full' type='password' />
          <Button className='uppercase'>Ingresar</Button>
        </form>
    </section>
  )
}

export default FormSection