import React from 'react';

const ContactInfoSkeleton: React.FC = () => {
  return (
    <div className="absolute inset-0 z-20 animate-pulse pointer-events-none h-full">
      <div className="space-y-7">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={`contact-item-skeleton-${index}`} className="flex items-center gap-4">
            <div className="h-6 w-6 shrink-0 rounded-full bg-white/35" />
            <div
              className={[
                'h-5 rounded bg-white/35',
                index === 0 ? 'w-[11.5rem]' : index === 1 ? 'w-[15rem]' : 'w-[13rem]'
              ].join(' ')}
            />
          </div>
        ))}
      </div>

      <div className="my-8 h-px bg-white/20" />

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-white/35" />
          <div className="h-5 w-32 rounded bg-white/35" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={`schedule-skeleton-${index}`} className="flex items-center gap-2 text-sm md:text-base">
              <div className="h-4 w-[8.5rem] rounded bg-white/35" />
              <div className="h-4 w-[7.25rem] rounded bg-white/22" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 h-12 w-full rounded-xl bg-white/35" />

      <div className="mt-12 flex items-center gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`social-skeleton-${index}`}
            className="h-11 w-11 rounded-full bg-white/35 shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default ContactInfoSkeleton;
