'use client';

type Props = {
  data: any[];
};

export default function AdminCards({ data }: Props) {
  return (
    <div className="flex flex-col gap-4 md:hidden">
      {data.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border-2 border-blue-900 p-4 text-sm"
        >
          <div className="grid grid-cols-[100px_1fr] gap-y-2">
            <span className="font-bold text-[#203565]">ID:</span>
            <span>{item.id}</span>

            <span className="font-bold text-[#203565]">NOMBRE:</span>
            <span>{item.nombre}</span>

            <span className="font-bold text-[#203565]">GMAIL:</span>
            <span>{item.gmail}</span>

            <span className="font-bold text-[#203565]">TELÉFONO:</span>
            <span>{item.telefono}</span>

            <span className="font-bold text-[#203565]">SECCIÓN:</span>
            <span>{item.seccion}</span>

            <span className="font-bold text-[#203565]">FECHA:</span>
            <span>{item.fecha}</span>
          </div>

          {/* Acciones */}
          <div className="mt-4 flex justify-end gap-3">
            <button className="text-red-600">🗑</button>
            <button className="text-green-600">✔</button>
          </div>
        </div>
      ))}
    </div>
  );
}
