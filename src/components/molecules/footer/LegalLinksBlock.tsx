const LegalLinksBlock = () => (
  <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
    <span className="font-bold text-[#6DE1E3] text-xl">Enlaces</span>
    <div className="flex flex-col gap-4">
      <a href="/reclamaciones" className="hover:text-[#6DE1E3] transition-colors">
        <span className="font-bold text-lg">Libro de reclamaciones</span>
      </a>
      <a href="/politicas-de-privacidad" className="hover:text-[#6DE1E3] transition-colors">
        <span className="font-bold text-lg">Políticas de privacidad</span>
      </a>
      <a href="/terminos-y-condiciones" className="hover:text-[#6DE1E3] transition-colors">
        <span className="font-bold text-lg">Términos y condiciones</span>
      </a>
    </div>
  </div>
);

export default LegalLinksBlock;