import Icon from "@/components/atoms/Icon";

const AddressBlock = () => (
  <div className="flex flex-col gap-2 text-left">
    <span className="font-bold text-[#6DE1E3]">Dirección</span>
    <span>Urb. Alameda La Rivera Mz F Lt 30</span>
    <span className="font-bold mt-2 text-[#6DE1E3]">Horario</span>
    <span><span className="font-bold">L - V:</span> 9 a.m - 5 p.m</span>
    <span><span className="font-bold">S:</span> 9 a.m - 2 p.m</span>
    <div className="flex flex-col items-start mt-4">
      <a href="/reclamaciones" className="mt-1">
        <span className="font-bold">Libro de reclamaciones</span>
      </a>
    </div>
    <div className="flex flex-col items-start mt-4">
      <a href="/politicas-de-privacidad" className="mt-1">
        <span className="font-bold">Políticas de privacidad</span>
      </a>
    </div>
    <div className="flex flex-col items-start mt-4">
      <a href="/terminos-y-condiciones" className="mt-1">
        <span className="font-bold">Términos y condiciones</span>
      </a>
    </div>
  </div>
);

export default AddressBlock;
