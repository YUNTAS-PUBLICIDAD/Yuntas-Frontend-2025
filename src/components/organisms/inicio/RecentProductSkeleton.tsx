export default function RecentProductsSkeleton() {
  return (
    <section className="bg-[#F8FAFC] py-24">
      <div className="container mx-auto px-6">

        <div className="text-center mb-14">
          <div className="mx-auto h-4 w-40 rounded bg-slate-200 animate-pulse" />

          <div className="mx-auto mt-5 h-10 w-[420px] max-w-full rounded bg-slate-200 animate-pulse" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
              "
            >
              <div className="aspect-[4/3] bg-slate-200 animate-pulse" />

              <div className="p-6">
                <div className="h-6 w-40 rounded bg-slate-200 animate-pulse" />

                <div className="mt-4 h-4 rounded bg-slate-200 animate-pulse" />

                <div className="mt-2 h-4 w-2/3 rounded bg-slate-200 animate-pulse" />

                <div className="mt-6 h-4 w-24 rounded bg-slate-200 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
