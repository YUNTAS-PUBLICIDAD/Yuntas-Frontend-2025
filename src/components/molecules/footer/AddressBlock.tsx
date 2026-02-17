const AddressBlock = () => (
  <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start">
    {/* Sección Dirección */}
    <div className="flex flex-col gap-2">
        <span className="font-bold text-[#6DE1E3] text-xl">Dirección</span>
        <span className="text-lg">Urb. Alameda La Rivera Mz F Lt 30</span>
    </div>

    {/* Sección Horario */}
    <div className="flex flex-col gap-2">
        <span className="font-bold text-[#6DE1E3] text-xl">Horario</span>
        <div className="flex flex-col gap-1">
        <span className="text-lg"><span className="font-bold">L - V:</span> 9 a.m - 5 p.m</span>
        <span className="text-lg"><span className="font-bold">S:</span> 9 a.m - 2 p.m</span>
        </div>
    </div>
  </div>
);

export default AddressBlock;