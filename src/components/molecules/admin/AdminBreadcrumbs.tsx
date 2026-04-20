"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useSelectedLayoutSegment } from "next/navigation";
import {
  adminSections,
  defaultAdminSection,
  getAdminSectionKey,
} from "@/config/adminSections";

export default function AdminBreadcrumbs() {
  const segment = useSelectedLayoutSegment();
  const key = getAdminSectionKey(segment);
  const current = adminSections[key];

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-white/60">
        <li>
          <Link
            href={adminSections[defaultAdminSection].href}
            className="transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            Administración
          </Link>
        </li>
        <li aria-hidden="true" className="text-slate-300 dark:text-white/25">
          <ChevronRight className="h-4 w-4" />
        </li>
        <li className="font-medium text-slate-900 dark:text-white">
          {current.label}
        </li>
      </ol>
    </nav>
  );
}