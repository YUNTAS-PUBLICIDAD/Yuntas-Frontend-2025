'use client';

import { useSettingsContext } from '@/providers/SettingsProvider';

interface HorarioDia {
  day: string;
  start_time: string;
  end_time: string;
}

const DAY_LABELS = ['Lunes - Viernes', 'Sábado', 'Domingo'] as const;

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function formatTime(time: string) {
  if (!time) return '';
  const [hourText, minuteText] = time.split(':');
  const hour = Number.parseInt(hourText, 10);
  return `${hour > 12 ? hour - 12 : hour || 12}:${minuteText} ${hour >= 12 ? 'PM' : 'AM'}`;
}

function getHorarioTexto(horario?: HorarioDia | null) {
  if (!horario || !horario.start_time || !horario.end_time) return 'Cerrado';
  return `${formatTime(horario.start_time)} - ${formatTime(horario.end_time)}`;
}

const AddressBlock = () => {
  const { contact } = useSettingsContext();

  const businessHours = contact?.business_hours ?? [];

  const getDaySchedule = (label: string) =>
    businessHours.find((item) => normalizeText(item.day) === normalizeText(label)) ?? null;

  return (
    <div className="flex flex-col gap-8 text-center md:text-left items-center md:items-start">

      {/* Sección Dirección */}
      <div className="flex flex-col gap-4 w-full">
        <span className="font-bold text-brand-cyan text-xl tracking-wide inline-block">
          Dirección
        </span>
        <p className="text-base md:text-lg text-gray-200">
          {contact?.address?.trim() || 'Urb. Alameda La Rivera Mz F Lt 30'}
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
            <span className="ml-4">{getHorarioTexto(getDaySchedule(DAY_LABELS[0]))}</span>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold">Sábados:</span>
            <span className="ml-4">{getHorarioTexto(getDaySchedule(DAY_LABELS[1]))}</span>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold">Domingos:</span>
            <span className="ml-4">{getHorarioTexto(getDaySchedule(DAY_LABELS[2]))}</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AddressBlock;