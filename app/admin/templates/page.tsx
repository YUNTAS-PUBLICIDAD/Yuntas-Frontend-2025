'use client';

import { useTemplates } from '@/hooks/useTemplates';
import { useEffect, useState, useCallback } from 'react';
import TemplateConfigForm from '../popups/TemplateConfigForm';
import { Template } from '@/types/admin/template';
import {
  Plus,
  FileText,
  Pencil,
  ToggleLeft,
  ToggleRight,
  Layers,
  AlertCircle,
  Loader2,
} from 'lucide-react';

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

const SOURCE_LABELS: Record<number, string> = {
  1: 'Inicio',
  2: 'Productos',
  3: 'Detalle de Producto',
  4: 'Administración',
};

const CHANNEL_LABELS: Record<string, string> = {
  whatsapp: 'WhatsApp',
  email: 'Email',
};

// ──────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-500 dark:text-gray-400">
      <Loader2 className="h-8 w-8 animate-spin text-[#203565] dark:text-blue-400" />
      <span className="text-sm font-medium">Cargando plantillas…</span>
    </div>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="w-16 h-16 rounded-full bg-[#eef2fb] dark:bg-[#1e264a] flex items-center justify-center">
        <Layers className="h-7 w-7 text-[#203565] dark:text-blue-400" />
      </div>
      <div>
        <p className="text-base font-semibold text-gray-800 dark:text-gray-100">
          No hay plantillas configuradas
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Crea tu primera plantilla para empezar a enviar mensajes automáticos.
        </p>
      </div>
      <button
        onClick={onCreate}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#203565] hover:bg-[#1a2b52] text-white text-sm font-bold rounded-lg transition-colors shadow"
      >
        <Plus className="h-4 w-4" />
        Crear primera plantilla
      </button>
    </div>
  );
}

interface TemplateRowProps {
  template: Template;
  onEdit: (template: Template) => void;
}

function TemplateRow({ template, onEdit }: TemplateRowProps) {
  const channels = template.contents?.map((c) => CHANNEL_LABELS[c.channel] ?? c.channel) ?? [];

  return (
    <div className="group flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1a2240] transition-colors last:border-b-0">
      {/* Left: info */}
      <div className="flex items-start gap-4 min-w-0">
        {/* Icon */}
        <div className="mt-0.5 w-9 h-9 rounded-lg bg-[#eef2fb] dark:bg-[#1e264a] flex items-center justify-center shrink-0">
          <FileText className="h-4 w-4 text-[#203565] dark:text-blue-400" />
        </div>

        {/* Text */}
        <div className="min-w-0">
          <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
            {template.name}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {/* Source badge */}
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium">
              {SOURCE_LABELS[template.lead_source_id ?? 0] ?? `Fuente ${template.lead_source_id}`}
            </span>

            {/* Channel badges */}
            {channels.map((ch) => (
              <span
                key={ch}
                className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                  ch === 'WhatsApp'
                    ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                }`}
              >
                {ch}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right: status + actions */}
      <div className="flex items-center gap-4 shrink-0 ml-4">
        {/* Active status */}
        <div className="hidden sm:flex items-center gap-1.5">
          {template.active ? (
            <>
              <ToggleRight className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Activo</span>
            </>
          ) : (
            <>
              <ToggleLeft className="h-4 w-4 text-gray-400" />
              <span className="text-xs font-medium text-gray-400">Inactivo</span>
            </>
          )}
        </div>

        {/* Edit button */}
        <button
          onClick={() => onEdit(template)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#203565] dark:text-blue-400 border border-[#203565]/30 dark:border-blue-400/30 rounded-md hover:bg-[#203565] hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-colors"
        >
          <Pencil className="h-3.5 w-3.5" />
          Editar
        </button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────

type PageMode = 'list' | 'create' | 'edit';

export default function TemplatesPage() {
  const { templates, getTemplates, saveTemplate, isLoading, isSaving } = useTemplates();
  const [mode, setMode] = useState<PageMode>('list');
  const [selected, setSelected] = useState<Template | null>(null);

  useEffect(() => {
    getTemplates();
  }, []);

  const handleCreate = useCallback(() => {
    setSelected(null);
    setMode('create');
  }, []);

  const handleEdit = useCallback((template: Template) => {
    setSelected(template);
    setMode('edit');
  }, []);

  const handleCancel = useCallback(() => {
    setMode('list');
    setSelected(null);
  }, []);

  const handleSave = useCallback(
    async (data: Template) => {
      const isUpdate = mode === 'edit';
      await saveTemplate(data, isUpdate);
      await getTemplates();
      setMode('list');
      setSelected(null);
    },
    [mode, saveTemplate, getTemplates],
  );

  // ── CREATE / EDIT view ──
  if (mode === 'create' || mode === 'edit') {
    return (
      <TemplateConfigForm
        initialData={selected}
        onSubmit={handleSave}
        isSaving={isSaving}
        onCancel={handleCancel}
      />
    );
  }

  // ── LIST view ──
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 animate-fade-in">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Plantillas de Mensajes
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Gestiona las plantillas automáticas de WhatsApp y correo electrónico.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#203565] hover:bg-[#1a2b52] text-white text-sm font-bold rounded-lg transition-colors shadow-md whitespace-nowrap"
        >
          <Plus className="h-4 w-4" />
          Nueva Plantilla
        </button>
      </div>

      {/* ── Content ── */}
      {isLoading ? (
        <LoadingState />
      ) : templates.length === 0 ? (
        <EmptyState onCreate={handleCreate} />
      ) : (
        <div className="bg-white dark:bg-[#141A3F] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">

          {/* Table header */}
          <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#1a2240]">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              {templates.length} plantilla{templates.length !== 1 ? 's' : ''} configurada{templates.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Rows */}
          {templates.map((t) => (
            <TemplateRow key={t.id} template={t} onEdit={handleEdit} />
          ))}
        </div>
      )}

      {/* ── Info banner ── */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40 text-sm text-blue-700 dark:text-blue-300">
        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
        <span>
          Las plantillas activas se enviarán automáticamente cuando un lead ingrese desde la fuente configurada.
          Asegúrate de que al menos un canal (WhatsApp o Email) esté habilitado.
        </span>
      </div>
    </div>
  );
}
