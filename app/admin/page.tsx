'use client';

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ComposedChart, Line, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Users, Package, FileText, TrendingUp } from "lucide-react";
import { useLeads } from "@/hooks/useLeads";
import { useBlogs } from "@/hooks/useBlog";
import { useProductos } from "@/hooks/useProductos";
import { getMostViewedPages } from "@/services/trackingService";


interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  isLoading?: boolean;
}

function StatCard({ label, value, icon, iconBg, isLoading }: StatCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isLoading) return;
    let c = 0;
    const step = Math.ceil(value / 40);
    const t = setInterval(() => {
      c += step;
      if (c >= value) { setCount(value); clearInterval(t); }
      else setCount(c);
    }, 20);
    return () => clearInterval(t);
  }, [value, isLoading]);

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#1C2347] p-5 shadow-sm">
      <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${iconBg} shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-white/50 mb-0.5">{label}</p>
        {isLoading ? (
          <div className="h-8 w-16 rounded-lg bg-gray-200 dark:bg-white/10 animate-pulse mt-1" />
        ) : (
          <p className="text-3xl font-bold text-[#0D1030] dark:text-white tracking-tight">
            {count.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}


function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-[#203565] px-4 py-2 text-white text-sm shadow-xl">
      <p className="font-semibold">{label}</p>
      <p className="text-white/70">{payload[0].value.toLocaleString()} visitas</p>
    </div>
  );
}

const getMonthValue = (date = new Date()) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

const getMonthLabel = (date = new Date()) => {
  return new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(date).replace(/^./, (char) => char.toUpperCase());
};

// Dashboard Page 
export default function AdminDashboardPage() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentMonthValue, setCurrentMonthValue] = useState(() => getMonthValue());
  const [selectedMonth, setSelectedMonth] = useState(() => getMonthValue());

  const { leads, getLeads, isLoading: loadingLeads } = useLeads();
  const { blogs, getBlogs, isLoading: loadingBlogs } = useBlogs();
  const { productos, getProductos, isLoading: loadingProductos } = useProductos();

  useEffect(() => {
    const syncTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    syncTheme();
    window.addEventListener("themechange", syncTheme);

    return () => window.removeEventListener("themechange", syncTheme);
  }, []);

  useEffect(() => {
    const syncCurrentMonth = () => {
      const nextMonthValue = getMonthValue();
      setCurrentMonthValue((prevCurrent) => {
        if (prevCurrent !== nextMonthValue) {
          // If the month rolled over, transition the selection if it was set to the previous current month
          setSelectedMonth((prevSelected) => (prevSelected === prevCurrent ? nextMonthValue : prevSelected));
          return nextMonthValue;
        }
        return prevCurrent;
      });
    };

    // Check hourly for month roll-over (safely within 32-bit delay limits)
    const intervalId = setInterval(syncCurrentMonth, 3600000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    getLeads(200);
    getBlogs(200);
    getProductos(200);
  }, [getLeads, getBlogs, getProductos]);

  // Últimos 5 clientes registrados
  const recentClients = leads.slice(0, 5);

  // Colores para los avatares de clientes
  const avatarColors = [
    "bg-blue-500", "bg-green-500", "bg-purple-500",
    "bg-yellow-500", "bg-pink-500",
  ];

  const getInitials = (name: string) =>
    name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

  const [pageViewData, setPageViewData] = useState<{ page: string; views: number }[]>([]);
  const [loadingViews, setLoadingViews] = useState(true);
  const chartTickColor = isDarkMode ? "#cbd5e1" : "#64748b";
  const chartAccentColor = isDarkMode ? "#c4b5fd" : "#a855f7";
  const chartFillColor = isDarkMode ? "#c4b5fd" : "#a855f7";
  const chartGridColor = isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(15, 23, 42, 0.18)";
  const chartAxisLineColor = isDarkMode ? "rgba(255, 255, 255, 0.25)" : "rgba(15, 23, 42, 0.35)";
  const totalMonthViews = pageViewData.reduce((total, item) => total + item.views, 0);

  const monthOptions = useMemo(() => {
    const options = [
      {
        value: "all",
        label: "Vista general",
      },
    ];

    const now = new Date();
    const startYear = 2026;
    const startMonth = 4; // May (0-indexed)

    const endYear = now.getFullYear();
    const endMonth = now.getMonth();

    const tempOptions = [];
    let y = startYear;
    let m = startMonth;

    while (y < endYear || (y === endYear && m <= endMonth)) {
      const d = new Date(y, m, 1);
      tempOptions.push({
        value: getMonthValue(d),
        label: getMonthLabel(d),
      });

      m++;
      if (m > 11) {
        m = 0;
        y++;
      }
    }

    // Sort options to show newest month first
    tempOptions.reverse();
    options.push(...tempOptions);

    return options;
  }, [currentMonthValue]);

  useEffect(() => {
    let isCancelled = false;
    setLoadingViews(true);

    const fetchPageViews = async () => {
      try {
        const data = await getMostViewedPages(selectedMonth === "all" ? undefined : selectedMonth);
        const mappedData = (data || []).map((item: any) => ({
          page: item.name,
          views: Math.round(Number(item.total_views) || 0),
        }));

        const defaultPages = [
          { page: "Inicio", views: 0 },
          { page: "Nosotros", views: 0 },
          { page: "Productos", views: 0 },
          { page: "Blog", views: 0 },
          { page: "Contacto", views: 0 }
        ];

        const merged = defaultPages.map(def => {
          const found = mappedData.find((m: any) => m.page === def.page);
          return found ? found : def;
        });

        if (!isCancelled) {
          setPageViewData(merged);
        }
      } catch (error) {
        console.error("Error loading page view stats:", error);
      } finally {
        if (!isCancelled) {
          setLoadingViews(false);
        }
      }
    };

    fetchPageViews();

    let intervalId: ReturnType<typeof setInterval> | undefined;
    if (selectedMonth === currentMonthValue) {
      intervalId = setInterval(fetchPageViews, 30000);
    }

    return () => {
      isCancelled = true;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [selectedMonth, currentMonthValue]);

  const stats: StatCardProps[] = [
    {
      label: "Total de clientes",
      value: leads.length,
      icon: <Users className="w-6 h-6 text-white" />,
      iconBg: "bg-blue-500",
      isLoading: loadingLeads,
    },
    {
      label: "Total de productos",
      value: productos.length,
      icon: <Package className="w-7 h-7 text-[#1a2e00]" />,
      iconBg: "bg-[#D6F695]",
      isLoading: loadingProductos,
    },
    {
      label: "Total de blogs",
      value: blogs.length,
      icon: <FileText className="w-6 h-6 text-white" />,
      iconBg: "bg-purple-500",
      isLoading: loadingBlogs,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Chart + Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* Line Chart */}
        <div className="lg:col-span-3 rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#1C2347] p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#203565] dark:text-white" />
              <h2 className="text-sm font-semibold text-[#203565] dark:text-white">Páginas más vistas</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 dark:text-white/60">Mes</span>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-xs text-[#203565] shadow-sm outline-none transition-colors focus:border-[#a855f7] dark:border-white/10 dark:bg-[#141A3F] dark:text-white disabled:cursor-default disabled:opacity-90"
              >
                {monthOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {loadingViews ? (
            <div className="h-[220px] w-full flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded-xl animate-pulse">
              <span className="text-xs text-gray-400 dark:text-white/30">Cargando estadísticas...</span>
            </div>
          ) : (
            <>
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={pageViewData} margin={{ top: 10, right: 60, left: 12, bottom: 28 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
                <XAxis
                  dataKey="page"
                  tick={{ fontSize: 12, fill: chartTickColor }}
                  axisLine={{ stroke: chartAxisLineColor, strokeWidth: 1 }}
                  tickLine={false}
                  interval={0}
                  height={34}
                  tickMargin={12}
                  textAnchor="middle"
                  padding={{ left: 24, right: 24 }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: chartTickColor }}
                  axisLine={false}
                  tickLine={false}
                  width={48}
                  allowDecimals={false}
                  domain={[0, (dataMax) => (!dataMax || isNaN(dataMax)) ? 10 : dataMax + (Math.ceil(dataMax / 4) || 1)]}
                  tickFormatter={(value) => Math.round(Number(value)).toString()}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="none"
                  fill={chartFillColor}
                  fillOpacity={isDarkMode ? 0.18 : 0.16}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone" dataKey="views" stroke={chartAccentColor} strokeWidth={2.5}
                  dot={{ fill: chartAccentColor, r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: chartAccentColor }}
                />
              </ComposedChart>
            </ResponsiveContainer>
              <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-white/50">
                    {selectedMonth === "all" ? "Vistas totales" : "Vistas totales del mes"}
                  </p>
                  <p className="text-lg font-semibold text-[#0D1030] dark:text-white">{totalMonthViews.toLocaleString()}</p>
                </div>
                <p className="text-xs text-gray-400 dark:text-white/40 text-right">
                  {selectedMonth === "all"
                    ? "Vista general"
                    : selectedMonth === currentMonthValue
                      ? "Se actualiza en tiempo real"
                      : "Mes cerrado"}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Recent Clients */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#1C2347] p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#203565] dark:text-white" />
              <h2 className="text-sm font-semibold text-[#203565] dark:text-white">Clientes recientes</h2>
            </div>
            <button
              onClick={() => router.push("/admin/seguimiento")}
              className="text-xs font-semibold rounded-lg px-3 py-1.5 text-white bg-[#203565] dark:bg-white dark:text-[#0D1030] hover:bg-[#162548] dark:hover:bg-gray-100 transition-colors"
            >
              Ver todos
            </button>
          </div>

          {loadingLeads ? (
            <div className="flex flex-col gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 rounded bg-gray-200 dark:bg-white/10 animate-pulse w-3/4" />
                    <div className="h-2.5 rounded bg-gray-200 dark:bg-white/10 animate-pulse w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {recentClients.map((client, i) => (
                <div key={client.id} className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} text-white text-xs font-bold shrink-0`}>
                    {getInitials(client.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0D1030] dark:text-white truncate">{client.name}</p>
                    <p className="text-xs text-gray-400 dark:text-white/40 truncate">{client.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}