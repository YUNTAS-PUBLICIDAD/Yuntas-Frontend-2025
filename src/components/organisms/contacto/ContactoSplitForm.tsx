'use client';

import { contactoInfoData, contactoSocialLinks } from '@/data/contacto/contactoData';
import { useSolicitudInfo } from '@/hooks/useSolicitudInfo';
import PrimaryButton from '@/components/atoms/PrimaryButton';

const ContactoSplitForm = () => {
  const { formData, handleInputChange, handleSubmit, isLoading } = useSolicitudInfo();

  return (
    <section className="bg-[#f5f5f5] pt-20 pb-6 md:pt-24 md:pb-10">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className="overflow-hidden rounded-2xl border border-[#e9e9e9] bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[460px_1fr]">
            <aside className="relative overflow-hidden bg-gradient-to-b from-[#04194c] via-[#0a2f6f] to-[#2398ab] px-7 py-10 text-white md:px-10 md:py-12">
              <h2 className="text-3xl font-bold leading-tight md:text-[42px]">Informacion de Contacto</h2>
              <p className="mt-3 text-lg text-white/90 md:text-2xl">Solicita informacion aqui</p>

              <div className="mt-12 space-y-8 md:mt-16">
                {contactoInfoData.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.ariaLabel} className="flex items-center gap-4 text-lg">
                      <Icon className="h-6 w-6 shrink-0 text-white" aria-hidden="true" />
                      <span className="break-all">{item.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 flex items-center gap-4 md:mt-28">
                {contactoSocialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#031733] transition-colors hover:bg-[#05244b]"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>

              <div className="pointer-events-none absolute -bottom-20 right-12 h-44 w-44 rounded-full bg-white/15" aria-hidden="true" />
              <div className="pointer-events-none absolute -bottom-10 right-[-20px] h-56 w-56 rounded-full bg-white/15" aria-hidden="true" />
            </aside>

            <div className="px-7 py-10 md:px-12 md:py-12">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-semibold text-[#8d8d8d]">
                      Nombre
                    </label>
                    <input
                      id="first_name"
                      name="first_name"
                      required
                      value={formData.first_name}
                      onChange={handleInputChange}
                      placeholder="Ej: Juan"
                      className="mt-2 w-full border-0 border-b border-[#b8b8b8] bg-transparent px-0 pb-2 text-xl text-[#606060] placeholder:text-[#b0b0b0] focus:border-[#2398ab] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="last_name" className="block text-sm font-semibold text-[#8d8d8d]">
                      Apellido
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      required
                      value={formData.last_name}
                      onChange={handleInputChange}
                      placeholder="Ej: Perez"
                      className="mt-2 w-full border-0 border-b border-[#b8b8b8] bg-transparent px-0 pb-2 text-xl text-[#606060] placeholder:text-[#b0b0b0] focus:border-[#2398ab] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="district" className="block text-sm font-semibold text-[#8d8d8d]">
                      Distrito
                    </label>
                    <input
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      placeholder="Ej: Lima"
                      className="mt-2 w-full border-0 border-b border-[#b8b8b8] bg-transparent px-0 pb-2 text-xl text-[#606060] placeholder:text-[#b0b0b0] focus:border-[#2398ab] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-[#8d8d8d]">
                      Telefono
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Ej: 987 654 321"
                      className="mt-2 w-full border-0 border-b border-[#b8b8b8] bg-transparent px-0 pb-2 text-xl text-[#606060] placeholder:text-[#b0b0b0] focus:border-[#2398ab] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="request_detail" className="block text-sm font-semibold text-[#8d8d8d]">
                    Detalle Solicitud
                  </label>
                  <input
                    id="request_detail"
                    name="request_detail"
                    value={formData.request_detail}
                    onChange={handleInputChange}
                    placeholder="Describe tu solicitud..."
                    className="mt-2 w-full border-0 border-b border-[#b8b8b8] bg-transparent px-0 pb-2 text-xl text-[#606060] placeholder:text-[#b0b0b0] focus:border-[#2398ab] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#8d8d8d]">
                    ¿Como podemos ayudarte?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={500}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe tu consulta..."
                    className="mt-2 h-28 w-full resize-none border-0 border-b border-[#b8b8b8] bg-transparent px-0 pb-2 text-xl text-[#606060] placeholder:text-[#b0b0b0] focus:border-[#2398ab] focus:outline-none"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <PrimaryButton
                    type="submit"
                    disabled={isLoading}
                    className="!rounded-lg !px-10 !py-4 !text-base !font-semibold !normal-case !bg-[#2497a8] hover:!bg-[#1f8593]"
                  >
                    {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactoSplitForm;