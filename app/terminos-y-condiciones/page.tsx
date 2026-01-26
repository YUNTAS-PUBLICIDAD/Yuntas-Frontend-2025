import React from 'react';
import CommonHero from '@/components/organisms/static-pages/CommonHero';
import StaticContent from '@/components/organisms/static-pages/StaticContent';

export default function TerminosCondicionesPage() {
    return (
        <main>
            <CommonHero title="Términos y Condiciones" />
            <StaticContent bannerTitle="Términos y Condiciones">
                <p>
                    Bienvenido a <strong>YUNTAS</strong>. Al acceder a nuestro sitio web y utilizar nuestros servicios, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones.
                </p>

                <h3 className="text-2xl font-bold text-[#23C1DE] mt-8 mb-4">1. Aceptación de los términos</h3>
                <p>
                    Al utilizar este sitio web, usted confirma que ha leído, entendido y aceptado estos términos y condiciones en su totalidad. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio.
                </p>

                <h3 className="text-2xl font-bold text-[#23C1DE] mt-8 mb-4">2. Uso del sitio web</h3>
                <p>
                    Usted se compromete a utilizar nuestro sitio web únicamente con fines lícitos y de una manera que no infrinja los derechos de terceros ni restrinja o inhiba el uso y disfrute del sitio por parte de otros usuarios.
                </p>

                <h3 className="text-2xl font-bold text-[#23C1DE] mt-8 mb-4">3. Propiedad Intelectual</h3>
                <p>
                    Todo el contenido incluido en este sitio, como texto, gráficos, logotipos, imágenes y software, es propiedad de <strong>YUNTAS</strong> o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual correspondientes.
                </p>

                <h3 className="text-2xl font-bold text-[#23C1DE] mt-8 mb-4">4. Limitación de responsabilidad</h3>
                <p>
                    <strong>YUNTAS</strong> no será responsable de ningún daño directo, indirecto, incidental o consecuente que surja del uso o la imposibilidad de usar nuestro sitio web o servicios.
                </p>

                <h3 className="text-2xl font-bold text-[#23C1DE] mt-8 mb-4">5. Modificaciones</h3>
                <p>
                    Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento sin previo aviso. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.
                </p>

                <h3 className="text-2xl font-bold text-[#23C1DE] mt-8 mb-4">6. Ley aplicable</h3>
                <p>
                    Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes del país en el que opera <strong>YUNTAS</strong>.
                </p>
            </StaticContent>
        </main>
    );
}
