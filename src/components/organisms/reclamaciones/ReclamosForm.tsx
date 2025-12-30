'use client';

import Button from "@/components/atoms/Button";
import { Toaster } from 'react-hot-toast';
import Text from '@/components/atoms/Text'
import CircleNumber from '@/components/molecules/reclamaciones/CircleNumber'
import DatosBlock from '@/components/molecules/reclamaciones/DatosBlock'
import ReclamoBlock from '@/components/molecules/reclamaciones/ReclamoBlock'
import { useLibroReclamaciones } from "@/hooks/useLibroReclamaciones";

export default function ReclamosForm() {
    const { formData, handleInputChange, isLoading, handleSubmit } = useLibroReclamaciones();
    
    return (
        <form className='flex flex-col gap-12 px-6 md:px-16 py-10 max-w-4xl mx-auto'>

            {/* seccion donde se pone los datos */}
            <div className='flex items-center gap-4'>
                <CircleNumber number="1" />
                <Text color='black' variant='subtitle'>
                    Datos de la persona que presenta el reclamo
                </Text>
            </div>
            <DatosBlock formData={formData} handleChange={handleInputChange}/>

            {/*seccion donde se detalla el reclamo */}
            <div className='flex items-center gap-4'>
                <CircleNumber number="2" />
                <Text color='black' variant='subtitle'>
                    Información de reclamo
                </Text>
            </div>
            <ReclamoBlock formData={formData} handleChange={handleInputChange}/>
            <Button
                size='md'
                className='w-full md:w-[344px] rounded-3xl text-white mx-auto bg-[#23C1DE]'
                onClick={handleSubmit}
            >
                {isLoading ? "Enviando..." : "Enviar"}
            </Button>
            <Toaster
              position="bottom-right"
              reverseOrder={false}
              toastOptions={{
                 style: {
                    border: '1px solid #203565',
                    padding: '16px',
                    color: '#203565',
                },
              }}
            />
        </form>
    );
}