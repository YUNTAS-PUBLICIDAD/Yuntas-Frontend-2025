const AddressBlock = () => (
  <div className="flex flex-col gap-8 text-center md:text-left items-center md:items-start">
    
    {/* Sección Dirección */}
    <div className="flex flex-col gap-4 w-full">
      <span className="font-bold text-brand-cyan text-xl tracking-wide inline-block">
        Dirección
      </span>
      <p className="text-base md:text-lg text-gray-200">
        Urb. Alameda La Rivera Mz F Lt 30
      </p>
    </div>

    {/* Sección Horario */}
<div className="flex flex-col gap-4">
  <span className="font-bold text-brand-cyan text-xl tracking-wide inline-block">
    Horario
  </span>

  <div className="flex flex-col gap-4 text-base md:text-lg text-gray-200">

    <div className="flex flex-col">
      <span className="font-semibold">Lunes a Viernes:</span>
      <span className="ml-4">9:00 a.m – 5:00 p.m</span>
    </div>

    <div className="flex flex-col">
      <span className="font-semibold">Sábados:</span>
      <span className="ml-4">9:00 a.m – 2:00 p.m</span>
    </div>

  </div>
</div>

  </div>
);

export default AddressBlock;