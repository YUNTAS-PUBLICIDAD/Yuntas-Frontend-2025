import Icon from "@/components/atoms/Icon";

const AddressBlock = () => (
  <div className="flex flex-col gap-2 text-center md:text-left items-center md:items-start">
    <span className="font-bold text-[#6DE1E3] text-xl">Dirección</span>
    <span className="text-lg">Urb. Alameda La Rivera Mz F Lt 30</span>

    <span className="font-bold mt-4 text-[#6DE1E3] text-xl">Horario</span>
    <div className="flex flex-col gap-1">
      <span className="text-lg"><span className="font-bold">L - V:</span> 9 a.m - 5 p.m</span>
      <span className="text-lg"><span className="font-bold">S:</span> 9 a.m - 2 p.m</span>
    </div>

    <div className="flex flex-col gap-6 mt-8 items-center md:items-start">
      <a href="/reclamaciones">
        <span className="font-bold text-lg">Libro de reclamaciones</span>
      </a>
      <a href="/politicas-de-privacidad">
        <span className="font-bold text-lg">Políticas de privacidad</span>
      </a>
      <a href="/terminos-y-condiciones">
        <span className="font-bold text-lg">Términos y condiciones</span>
      </a>
    </div>
  </div>
);

export default AddressBlock;
