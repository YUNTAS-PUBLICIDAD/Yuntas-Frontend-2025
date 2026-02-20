const AddressBlock = () => (
  <div className="flex flex-col gap-8 text-center md:text-left items-center md:items-start">
    
    {/* Sección Dirección */}
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold text-[#6DE1E3] text-xl tracking-wide">
        Dirección
      </h3>
      <p className="text-base md:text-lg text-gray-200">
        Urb. Alameda La Rivera Mz F Lt 30
      </p>
    </div>

    {/* Sección Horario */}
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold text-[#6DE1E3] text-xl tracking-wide">
        Horario
      </h3>

      <div className="flex flex-col gap-1 text-base md:text-lg text-gray-200">
        <p>
          <span className="font-semibold">Lunes a Viernes:</span> 9 a.m – 5 p.m
        </p>
        <p>
          <span className="font-semibold">Sábado:</span> 9 a.m – 2 p.m
        </p>
      </div>
    </div>

  </div>
);

export default AddressBlock;