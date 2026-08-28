import React from 'react';
import CommonHero from '@/components/organisms/static-pages/CommonHero';
import StaticContent from '@/components/organisms/static-pages/StaticContent';
import Button from '@/components/atoms/Button';
import { SecurityIcon } from '@/components/atoms/icons';

export default function PoliticaPrivacidadPage() {
    return (
        <main>
            <CommonHero title="Políticas" overlay />
            <StaticContent bannerTitle="Políticas de Privacidad">
                <div className="flex items-center gap-2">
                    <SecurityIcon size={28} className="text-[#203565] flex-shrink-0" />
                    <h3 className="text-2xl font-bold text-[#203565]">Protección de datos personales</h3>
                </div>
                <p className="text-[#203565]">
                    Los datos proporcionados en este formulario serán utilizados únicamente para fines de contacto, atención de consultas y envío de información relacionada con nuestros productos o servicios.
                </p>
                <p className="text-[#203565] mt-4">
                    Nos comprometemos a proteger su información y a no compartirla con terceros sin su consentimiento, de acuerdo con la <strong>Ley N.º 29733 – Ley de Protección de Datos Personales</strong>.
                </p>
                <p className="text-[#203565] mt-4 italic">
                    Al enviar este formulario, usted acepta nuestra Política de Privacidad.
                </p>
                <div className='flex justify-end'>
                    <Button 
                    variant='tertiary'
                    href='/reclamaciones'
                    className='rounded-3xl md:w-[244px] text-white mx-auto md:mx-0'>
                        Ir al formulario    
                    </Button>
                </div>
            </StaticContent>
        </main>
    );
}
