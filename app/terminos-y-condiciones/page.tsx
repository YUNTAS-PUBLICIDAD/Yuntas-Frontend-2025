import React from 'react';
import CommonHero from '@/components/organisms/static-pages/CommonHero';
import StaticContent from '@/components/organisms/static-pages/StaticContent';

export default function TerminosCondicionesPage() {
    return (
        <main>
            <CommonHero title="Términos y Condiciones" />
            <StaticContent bannerTitle="Términos y Condiciones">
                <h3 className="text-3xl font-bold text-[#23C1DE] mb-6">TÉRMINOS Y CONDICIONES</h3>

                <section className="mb-8">
                    <h4 className="text-xl font-bold text-[#23C1DE] mb-2">1. Identificación del titular del sitio web</h4>
                    <p>
                        El presente sitio web es operado por <strong>Yuntas</strong>, con RUC <strong>[número de RUC]</strong>, con domicilio en <strong>Urb. Alameda La Rivera Mz F Lt 30, Lima, Perú</strong>, y correo electrónico de contacto <strong>yuntasproducciones@gmail.com</strong>.
                    </p>
                    <p className="mt-2">
                        El acceso y uso de este sitio web se rige por los presentes Términos y Condiciones, así como por la Política de Privacidad.
                    </p>
                </section>

                <section className="mb-8">
                    <h4 className="text-xl font-bold text-[#23C1DE] mb-2">2. Aceptación de los términos</h4>
                    <p>
                        El acceso, navegación y uso del sitio web implican la aceptación expresa de estos Términos y Condiciones. Si el usuario no está de acuerdo con alguno de ellos, deberá abstenerse de utilizar el sitio.
                    </p>
                </section>

                <section className="mb-8">
                    <h4 className="text-xl font-bold text-[#23C1DE] mb-2">3. Uso del sitio web</h4>
                    <p>
                        El usuario se compromete a utilizar el sitio web de manera lícita, conforme a la legislación peruana vigente, la moral y el orden público.
                    </p>
                    <p className="mt-2">
                        Queda prohibido el uso del sitio con fines ilícitos, fraudulentos o que puedan causar daños a la empresa, a terceros o al correcto funcionamiento de la plataforma.
                    </p>
                </section>

                <section className="mb-8">
                    <h4 className="text-xl font-bold text-[#23C1DE] mb-2">4. Protección de datos personales</h4>

                    <h5 className="font-bold mt-4">4.1 Marco legal</h5>
                    <p>
                        El tratamiento de los datos personales recopilados a través de este sitio web se realiza conforme a la <strong>Ley N.º 29733 – Ley de Protección de Datos Personales</strong>, su Reglamento aprobado por el Decreto Supremo N.º 003-2013-JUS, y demás normas complementarias vigentes en el Perú.
                    </p>

                    <h5 className="font-bold mt-4">4.2 Datos recopilados y finalidad</h5>
                    <p>
                        A través de formularios u otros medios electrónicos, se podrán recopilar datos personales como nombre, correo electrónico, número telefónico u otros datos necesarios. Dicha información será utilizada únicamente para las siguientes finalidades:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Atender consultas o solicitudes del usuario.</li>
                        <li>Brindar información sobre productos o servicios.</li>
                        <li>Fines comerciales y de comunicación, siempre que exista consentimiento previo.</li>
                    </ul>

                    <h5 className="font-bold mt-4">4.3 Consentimiento del usuario</h5>
                    <p>
                        El usuario declara que los datos proporcionados son veraces y otorga su consentimiento libre, previo, informado, expreso e inequívoco para el tratamiento de sus datos personales al completar y enviar los formularios del sitio web.
                    </p>

                    <h5 className="font-bold mt-4">4.4 Derechos del titular de los datos</h5>
                    <p>
                        El usuario puede ejercer sus derechos de acceso, rectificación, cancelación y oposición (derechos ARCO), enviando una solicitud al correo electrónico <strong>yuntasproducciones@gmail.com</strong>, conforme a la normativa vigente.
                    </p>

                    <h5 className="font-bold mt-4">4.5 Seguridad y confidencialidad</h5>
                    <p>
                        El titular del sitio adopta las medidas técnicas y organizativas razonables para proteger los datos personales contra accesos no autorizados, pérdida, uso indebido o divulgación. No obstante, el usuario reconoce que ningún sistema de seguridad es infalible.
                    </p>

                    <h5 className="font-bold mt-4">4.6 Conservación de los datos</h5>
                    <p>
                        Los datos personales serán conservados únicamente durante el tiempo necesario para cumplir con las finalidades para las que fueron recopilados o mientras exista una obligación legal.
                    </p>
                </section>

                <section className="mb-8">
                    <h4 className="text-xl font-bold text-[#23C1DE] mb-2">5. Propiedad intelectual</h4>
                    <p>
                        Todos los contenidos del sitio web, incluidos textos, imágenes, logotipos, diseños y material audiovisual, son propiedad del titular del sitio o cuentan con las licencias correspondientes, y están protegidos por la normativa sobre propiedad intelectual vigente en el Perú.
                    </p>
                </section>

                <section className="mb-8">
                    <h4 className="text-xl font-bold text-[#23C1DE] mb-2">6. Modificaciones</h4>
                    <p>
                        El titular del sitio se reserva el derecho de modificar los presentes Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigencia desde su publicación en el sitio web.
                    </p>
                </section>

                <section className="mb-8">
                    <h4 className="text-xl font-bold text-[#23C1DE] mb-2">7. Legislación aplicable y jurisdicción</h4>
                    <p>
                        Estos Términos y Condiciones se rigen por las leyes de la República del Perú. Cualquier controversia será sometida a la jurisdicción de los tribunales competentes del país.
                    </p>
                </section>

                <section className="mb-8">
                    <h4 className="text-xl font-bold text-[#23C1DE] mb-2">8. Contacto</h4>
                    <p>
                        Para cualquier consulta relacionada con estos Términos y Condiciones, el usuario puede comunicarse a través del correo electrónico <strong>yuntasproducciones@gmail.com</strong>.
                    </p>
                </section>
            </StaticContent>
        </main>
    );
}
