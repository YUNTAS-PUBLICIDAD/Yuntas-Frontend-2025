import React from 'react';
import CommonHero from '@/components/organisms/static-pages/CommonHero';
import StaticContent from '@/components/organisms/static-pages/StaticContent';

export default function PoliticaPrivacidadPage() {
    return (
        <main>
            <CommonHero title="Políticas de Privacidad" />
            <StaticContent bannerTitle="Políticas de Privacidad">
                <p>
                    En <strong>YUNTAS</strong>, valoramos su privacidad y estamos comprometidos a proteger sus datos personales. Esta política de privacidad explica cómo recopilamos, usamos y protegemos su información.
                </p>

                <h3 className="text-2xl font-bold text-[#23C1DE] mt-8 mb-4">1. Información que recopilamos</h3>
                <p>
                    Recopilamos información personal que usted nos proporciona directamente, como su nombre, dirección de correo electrónico, número de teléfono y cualquier otra información que decida compartir con nosotros a través de nuestros formularios de contacto o registro.
                </p>

                <h3 className="text-2xl font-bold text-[#23C1DE] mt-8 mb-4">2. Uso de la información</h3>
                <p>
                    Utilizamos la información recopilada para:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Proveer, operar y mantener nuestros servicios.</li>
                    <li>Mejorar, personalizar y expandir nuestros servicios.</li>
                    <li>Entender y analizar cómo utiliza nuestros servicios.</li>
                    <li>Comunicarnos con usted, ya sea directamente o a través de uno de nuestros socios.</li>
                </ul>

                <h3 className="text-2xl font-bold text-[#23C1DE] mt-8 mb-4">3. Seguridad de los datos</h3>
                <p>
                    Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra el acceso no autorizado, la pérdida o la alteración. Sin embargo, ninguna transmisión por Internet o método de almacenamiento electrónico es 100% seguro.
                </p>

                <h3 className="text-2xl font-bold text-[#23C1DE] mt-8 mb-4">4. Sus derechos</h3>
                <p>
                    Usted tiene derecho a acceder, rectificar o eliminar sus datos personales en cualquier momento. Para ejercer estos derechos, puede ponerse en contacto con nosotros a través de los canales proporcionados en nuestro sitio web.
                </p>

                <h3 className="text-2xl font-bold text-[#23C1DE] mt-8 mb-4">5. Cambios en esta política</h3>
                <p>
                    Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Le notificaremos cualquier cambio publicando la nueva política en esta página.
                </p>
            </StaticContent>
        </main>
    );
}
