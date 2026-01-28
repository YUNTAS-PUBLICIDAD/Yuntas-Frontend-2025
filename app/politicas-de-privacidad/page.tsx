import React from 'react';
import CommonHero from '@/components/organisms/static-pages/CommonHero';
import StaticContent from '@/components/organisms/static-pages/StaticContent';

export default function PoliticaPrivacidadPage() {
    return (
        <main>
            <CommonHero title="Políticas de Privacidad" />
            <StaticContent bannerTitle="Políticas de Privacidad">
                <h3 className="text-2xl font-bold text-[#23C1DE] mt-8 mb-4">Protección de datos personales</h3>
                <p>
                    Los datos proporcionados en este formulario serán utilizados únicamente para fines de contacto, atención de consultas y envío de información relacionada con nuestros productos o servicios.
                </p>
                <p className="mt-4">
                    Nos comprometemos a proteger su información y a no compartirla con terceros sin su consentimiento, de acuerdo con la <strong>Ley N.º 29733 – Ley de Protección de Datos Personales</strong>.
                </p>
                <p className="mt-4 italic">
                    Al enviar este formulario, usted acepta nuestra Política de Privacidad.
                </p>
            </StaticContent>
        </main>
    );
}
