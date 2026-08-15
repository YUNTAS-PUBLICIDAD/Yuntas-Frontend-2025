'use client';

import Button from "@/components/atoms/Button";
import Text from '@/components/atoms/Text'
import CircleNumber from '@/components/molecules/reclamaciones/CircleNumber'
import DatosBlock from '@/components/molecules/reclamaciones/DatosBlock'
import ReclamoBlock from '@/components/molecules/reclamaciones/ReclamoBlock'
import { useLibroReclamaciones } from "@/hooks/useLibroReclamaciones";

export default function ReclamosForm() {
    const { formData, handleInputChange, isLoading, handleSubmit } = useLibroReclamaciones();

    return (
        <form className='flex flex-col rounded-3xl my-12 gap-6 px-6 md:px-12 py-10 max-w-4xl mx-auto [box-shadow:0_20px_25px_-5px_rgba(0,_0,_0,_0.15),_0_-10px_15px_-3px_rgba(0,_0,_0,_0.1)]'>

            {/* seccion donde se pone los datos */}
            <div className="bg-[#F3F4F6] flex flex-col gap-4 p-4 rounded-3xl md:p-8">
            <div className='flex items-center gap-2 text-brand-blue font-bold'>
                <CircleNumber number="1" />
                <Text color='black' variant='subtitle'>
                    Datos de la persona que presenta 
                </Text>
            </div>
            <DatosBlock formData={formData} handleChange={handleInputChange} />
            </div>

            {/*seccion donde se detalla el reclamo */}
            <div className="bg-[#F3F4F6] flex flex-col gap-4 p-4 rounded-3xl md:p-8">
            <div className='flex items-center gap-2 text-brand-blue font-bold'>
                <CircleNumber number="2" />
                <Text color='black' variant='subtitle'>
                    Información de reclamo
                </Text>
            </div>
                <ReclamoBlock formData={formData} handleChange={handleInputChange} />
            </div>
            <div className='w-full flex justify-end items-end'>
            <Button
                variant="tertiary"
                size='md'
                className='rounded-3xl md:w-[244px] text-white mx-auto md:mx-0' 
                onClick={handleSubmit}
                >
                {isLoading ? "Enviando..." : "Enviar"}
            </Button>
            </div>
        </form>
    );
}