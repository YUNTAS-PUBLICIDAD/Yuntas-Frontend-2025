'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Eye, Package, TrendingUp, ChevronUp, ChevronDown,
} from "lucide-react";
import { useProductos } from "@/hooks/useProductos";
import { useTopProductos } from "@/hooks/useTopProductos";
import { Producto } from "@/types/admin/producto";
import Pagination from "@/components/molecules/Pagination";
import SearchBar from "@/components/molecules/SearchBar";

const AVATAR_COLORS = [
  { bg: "bg-blue-500", text: "text-white" },
  { bg: "bg-[#D6F695]", text: "text-[#1a2e00]" },
  { bg: "bg-purple-500", text: "text-white" },
  { bg: "bg-yellow-500", text: "text-white" },
  { bg: "bg-pink-500", text: "text-white" },
];

function colorForCategory(category: string) {
  let hash = 0;
  for (let i = 0; i < category.length; i++) hash += category.charCodeAt(i);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function getInitials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function fmt(n: number) {
  return Math.round(n).toLocaleString("es-PE");
}

interface Row {
  id: number;
  name: string;
  category: string;
  views: number;
  image: string | null;
}

const PAGE_SIZE = 5;
const PERIODS = [
  { value: 7, label: "Últimos 7 días" },
  { value: 30, label: "Últimos 30 días" },
  { value: 90, label: "Últimos 90 días" },
];

type SortKey = "name" | "category" | "views";

export default function ProductosMasVistosPage() {
  const { productos, getProductos, isLoading } = useProductos();
  const [days, setDays] = useState(30);
  const [category, setCategory] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("views");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [paginated, setPaginated] = useState<Row[]>([]);

  const { metricsById } = useTopProductos(productos, days);

  useEffect(() => {
    getProductos(200);
  }, [getProductos]);

  useEffect(() => {
  if (productos.length > 0) {
    setProductosFiltrados(productos);
  }
}, [productos]);

  const categories = useMemo(
    () => Array.from(new Set(productos.map((p) => p.category_name).filter(Boolean))).sort() as string[],
    [productos]
  );

  const rows: Row[] = useMemo(() => {
  return productosFiltrados
    .map((p: Producto): Row => {
      const m = metricsById[p.id];
      
      return {
        id: p.id,
        name: p.name,
        category: p.category_name || "Sin categoría",
        views: m?.views ?? 0,
        image: p.main_image?.url ?? null,
      };
    })
    .filter((r) => !category || r.category === category);
}, [productosFiltrados, metricsById, category]);

  const sortedRows = useMemo(() => {
    const dir = sortDir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const av = sortKey === "name" || sortKey === "category" ? a[sortKey].toLowerCase() : a[sortKey];
      const bv = sortKey === "name" || sortKey === "category" ? b[sortKey].toLowerCase() : b[sortKey];
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }, [rows, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const totalViews = rows.reduce((s, r) => s + r.views, 0);
  const topProduct = rows.length ? [...rows].sort((a, b) => b.views - a.views)[0] : null;

  const top5 = [...rows].sort((a, b) => b.views - a.views).slice(0, 5);
  const maxViews = top5.length ? top5[0].views : 1;

  const columns: { key: SortKey | "rank"; label: string; sortable: boolean }[] = [
    { key: "rank", label: "#", sortable: false },
    { key: "name", label: "Producto", sortable: true },
    { key: "category", label: "Categoría", sortable: true },
    { key: "views", label: "Vistas", sortable: true },
  ];

  return (
    <div className="p-2 md:p-4 space-y-5">
      <Link
        href="/admin/productos"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#203565] hover:underline dark:text-[#6DE1E3]"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a productos
      </Link>

      <section className="rounded-[1.75rem] border border-[#D8E7F3] bg-white/90 p-5 shadow-[0_18px_40px_rgba(13,16,48,0.06)] backdrop-blur dark:border-white/10 dark:bg-[#1C2347]/90">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-[#0D1030] dark:text-white/90 md:text-4xl">
          Productos más vistos
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-500 dark:text-white/80 md:text-base">
          Ranking de productos por número de vistas por periodo.
        </p>
      </section>

       <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Top 5 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-[#1C2347]">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-[#203565] dark:text-white" />
          <h2 className="text-sm font-semibold text-[#203565] dark:text-white">Top 5 productos</h2>
        </div>
        <div className="flex flex-col gap-3">
          {top5.map((r, i) => (
            <div key={r.id} className="flex items-center gap-3">
              <span className="w-4 text-right text-xs font-bold text-gray-400 dark:text-white/40">{i + 1}</span>
              <div className="h-10 w-10 flex-none overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-white/5">
                {r.image ? (
                 <img
                   src={r.image}
                   alt={r.name}
                   className="h-full w-full object-cover"
                  />
                ) : (
                   <Package className="mx-auto mt-2 h-5 w-5 text-gray-400" />
                 )}
               </div>
              <span className="min-w-0 flex-1 sm:w-40 sm:flex-none truncate text-sm font-semibold text-[#0D1030] dark:text-white" title={r.name}>
                {r.name}
              </span>
              <span className="h-2.5 w-16 flex-none sm:w-auto sm:flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                <span
                  className="block h-full rounded-full bg-purple-500 dark:bg-purple-400"
                  style={{ width: `${(r.views / maxViews) * 100}%` }}
                />
              </span>
              <span className="w-10 flex-none text-right text-sm font-bold text-[#203565] dark:text-white">{fmt(r.views)}</span>
            </div>
          ))}
          {top5.length === 0 && (
            <p className="py-6 text-center text-sm text-gray-400 dark:text-white/40">Sin resultados para este filtro.</p>
          )}
        </div>
      </div>

      {/* Stat cards */}
      <div className="flex flex-col gap-4 h-full">
        <div className="flex-1 flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-[#1C2347]">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500">
            <Eye className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <p className="mb-0.5 text-xs text-gray-500 dark:text-white/50">Vistas totales</p>
            <p className="text-3xl font-bold tracking-tight text-[#0D1030] dark:text-white">{fmt(totalViews)}</p>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-[#1C2347]">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D6F695]">
            <Package className="h-6 w-6 text-[#1a2e00]" />
          </div>
          <div className="min-w-0">
            <p className="mb-0.5 text-xs text-gray-500 dark:text-white/50">Producto más visto</p>
            <p className="truncate text-lg font-bold text-[#0D1030] dark:text-white">{topProduct?.name ?? "—"}</p>
            <p className="text-xs text-gray-400 dark:text-white/40">{topProduct ? fmt(topProduct.views) + " vistas" : ""}</p>
          </div>
        </div>
      </div>
      </div>
      
      {/* Filtros */}
      <div className=" w-full flex flex-col gap-3 rounded-2xl border border-[#D8E7F3] bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#1C2347] md:flex-row md:items-center">
        <div className="flex w-full items-center gap-2 md:w-auto">
          <label className=" whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white/50">
            Periodo
          </label>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="min-w-0 flex-1 md:w-auto rounded-xl border border-[#D8E7F3] bg-white px-3 py-2 text-sm font-medium text-[#0D1030] outline-none transition focus:border-[#23C1DE] dark:border-white/10 dark:bg-[#111936] dark:text-white"
          >
            {PERIODS.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <label className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white/50">
            Categoría
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="min-w-0 w-44 rounded-xl border border-[#D8E7F3] bg-white px-3 py-2 text-xs lg:text-sm font-medium text-[#0D1030] outline-none transition focus:border-[#23C1DE] dark:border-white/10 dark:bg-[#111936] dark:text-white"
          >
            <option value="">Todas las secciones</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        
      <div className="w-full md:w-[700px] md:ml-auto">
       <SearchBar
      items={productos}
      onSearch={setProductosFiltrados}
      placeholder="Buscar producto..."
      searchKeys={["id", "name", "category_name"]}
      getDisplayValue={(item) => `${item.id} - ${item.name}`}
    />
  
</div>
</div>


      {/* Tabla completa */}
      <div className="w-full rounded-[1.75rem] border border-[#D8E7F3] bg-white/95 p-3 shadow-[0_18px_40px_rgba(13,16,48,0.07)] dark:border-white/10 dark:bg-[#1C2347]/95 md:p-5">
        <div className="w-full overflow-x-auto px-2 md:px-0">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-[#0D1030] dark:bg-[#293296]">
                {columns.map((c, i) => (
                  <th
                    key={c.key}
                    onClick={c.sortable ? () => toggleSort(c.key as SortKey) : undefined}
                    className={`py-3 px-4 text-center text-sm font-semibold text-white first:rounded-l-lg last:rounded-r-lg ${c.sortable ? "cursor-pointer select-none" : ""}`}
                  >
                    <span className="inline-flex items-center gap-1">
                      {c.label}
                      {c.sortable && sortKey === c.key && (
                        sortDir === "asc" ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <tr key={i}>
                    {columns.map((c) => (
                      <td key={c.key} className="bg-[#F4F4F2] py-3 px-4 first:rounded-l-lg last:rounded-r-lg dark:bg-[#151A3D]">
                        <div className="mx-auto h-4 w-full max-w-[9rem] animate-pulse rounded bg-gray-200 dark:bg-white/10" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="rounded-lg bg-[#F4F4F2] py-10 text-center text-sm text-gray-400 dark:bg-[#151A3D] dark:text-white/40">
                    No se encontraron productos con estos filtros.
                  </td>
                </tr>
              ) : (
                paginated.map((r) => {
                  const rank = sortedRows.findIndex((row) => row.id === r.id) + 1;
                  const color = colorForCategory(r.category);
                  return (
                    <tr key={r.id}>
                      <td className="rounded-l-lg bg-[#F4F4F2] py-3 px-4 text-center dark:bg-[#151A3D]">
                        <span
                          className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                            rank === 1
                              ? "bg-[#0D1030] text-white dark:bg-white dark:text-[#0D1030]"
                              : rank <= 3
                              ? "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300"
                              : "bg-white text-gray-400 dark:bg-white/5 dark:text-white/40"
                          }`}
                        >
                          {rank}
                        </span>
                      </td>
                      <td className="bg-[#F4F4F2] py-3 px-4 dark:bg-[#151A3D]">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${color.bg} ${color.text}`}>
                            {getInitials(r.name)}
                          </div>
                          <span className="font-semibold text-[#0D1030] dark:text-white">{r.name}</span>
                        </div>
                      </td>
                      <td className="bg-[#F4F4F2] py-3 px-4 text-center dark:bg-[#151A3D]">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#203565] dark:text-white/80">
                          <span className={`h-2 w-2 rounded-full ${color.bg}`} />
                          {r.category}
                        </span>
                      </td>
                      <td className="rounded-r-lg bg-[#F4F4F2] py-3 px-4 text-center font-bold tabular-nums text-[#0D1030] dark:bg-[#151A3D] dark:text-white">
                        {fmt(r.views)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {!isLoading && sortedRows.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Pagination pageSize={PAGE_SIZE} items={sortedRows} setProductosPaginados={setPaginated} />
          </div>
        )}
      </div>
    </div>
  );
}
