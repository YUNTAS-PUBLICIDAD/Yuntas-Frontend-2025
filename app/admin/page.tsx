'use client';

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, Package, FileText, TrendingUp } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
}

interface RecentClient {
  name: string;
  email: string;
  initials: string;
  color: string;
}


const pageViewData = [
  { page: "Inicio",    views: 1200 },
  { page: "Productos", views: 980  },
  { page: "Blog",      views: 750  },
  { page: "Nosotros",  views: 530  },
  { page: "Contacto",  views: 420  },
];

const recentClients: RecentClient[] = [
  { name: "Ana Martinez",   email: "ana.martinez@gmail.com",   initials: "AM", color: "bg-blue-500"   },
  { name: "Juan Rodriguez", email: "juan.rodriguez@gmail.com", initials: "JR", color: "bg-green-500"  },
  { name: "Luis Castillo",  email: "luis.castillo@gmail.com",  initials: "LC", color: "bg-purple-500" },
];

function StatCard({ label, value, icon, iconBg }: StatCardProps) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let c = 0;
    const step = Math.ceil(value / 40);
    const t = setInterval(() => {
      c += step;
      if (c >= value) { setCount(value); clearInterval(t); }
      else setCount(c);
    }, 20);
    return () => clearInterval(t);
  }, [value]);

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#1C2347] p-5 shadow-sm">
      <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${iconBg} shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-white/50 mb-0.5">{label}</p>
        <p className="text-3xl font-bold text-[#0D1030] dark:text-white tracking-tight">
          {count.toLocaleString()}
        </p>
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

export default function AdminDashboardPage() {
  const stats: StatCardProps[] = [
    { label: "Total de clientes",  value: 257, icon: <Users    className="w-5 h-5 text-white" />, iconBg: "bg-blue-500"   },
    { label: "Total de productos", value: 342, icon: <Package  className="w-5 h-5 text-white" />, iconBg: "bg-green-500"  },
    { label: "Total de blogs",     value: 86,  icon: <FileText className="w-5 h-5 text-white" />, iconBg: "bg-purple-500" },
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
            <TrendingUp className="w-4 h-4 text-[#203565] dark:text-purple-400" />
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
              <Users className="w-4 h-4 text-[#203565] dark:text-purple-400" />
              <h2 className="text-sm font-semibold text-[#203565] dark:text-white">Clientes recientes</h2>
            </div>
            <button className="text-xs font-semibold border border-gray-300 dark:border-white/20 rounded-lg px-3 py-1.5 text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
              Ver todos
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {recentClients.map((c) => (
              <div key={c.email} className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-9 h-9 rounded-full ${c.color} text-white text-xs font-bold shrink-0`}>
                  {c.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#0D1030] dark:text-white truncate">{c.name}</p>
                  <p className="text-xs text-gray-400 dark:text-white/40 truncate">{c.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}