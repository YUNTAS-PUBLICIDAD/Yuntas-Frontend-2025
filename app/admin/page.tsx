'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { Users, Package, FileText, TrendingUp } from "lucide-react";
import { useLeads } from "@/hooks/useLeads";
import { useBlogs } from "@/hooks/useBlog";
import { useProductos } from "@/hooks/useProductos";


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

// Dashboard Page 
export default function AdminDashboardPage() {
  const router = useRouter();

  const { leads, getLeads, isLoading: loadingLeads } = useLeads();
  const { blogs, getBlogs, isLoading: loadingBlogs } = useBlogs();
  const { productos, getProductos, isLoading: loadingProductos } = useProductos();

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

  // Data mock de páginas vistas
  const pageViewData = [
    { page: "Inicio",    views: 1200 },
    { page: "Productos", views: 980  },
    { page: "Blog",      views: 750  },
    { page: "Nosotros",  views: 530  },
    { page: "Contacto",  views: 420  },
  ];

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
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-4 h-4 text-[#203565] dark:text-white" />
            <h2 className="text-sm font-semibold text-[#203565] dark:text-white">Páginas más vistas</h2>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={pageViewData}>
              <XAxis dataKey="page" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={38} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone" dataKey="views" stroke="#a855f7" strokeWidth={2.5}
                dot={{ fill: "#a855f7", r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#c084fc" }}
              />
            </LineChart>
          </ResponsiveContainer>
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