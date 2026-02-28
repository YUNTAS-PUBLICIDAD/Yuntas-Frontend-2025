const LegalLinksBlock = () => (
  <>
    <div className="text-center md:text-right">
      <a 
        href="/reclamaciones"
        className="hover:text-[#6DE1E3] transition-colors duration-300"
      >
        Libro de reclamaciones
      </a>
    </div>

    <div className="text-center">
      <a 
        href="/politicas-de-privacidad"
        className="hover:text-[#6DE1E3] transition-colors duration-300"
      >
        Políticas de privacidad
      </a>
    </div>

    <div className="text-center md:text-left">
      <a 
        href="/terminos-y-condiciones"
        className="hover:text-[#6DE1E3] transition-colors duration-300"
      >
        Términos y condiciones
      </a>
    </div>
  </>
);

export default LegalLinksBlock;