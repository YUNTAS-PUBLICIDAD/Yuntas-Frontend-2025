'use client';
import { useState } from 'react';
import { useTemplateEditor } from '@/hooks/useTemplateEditor';
import { useTemplates } from '@/hooks/useTemplates';
import { TemplateEditor } from './_components/TemplateEditor';
import { TemplatesList } from './_components/TemplateList';
import { ArrowLeft, LayoutTemplate } from 'lucide-react';
import { getPermissions } from "@/utils/permission";

export default function TemplatesPage() {
  const [mode, setMode] = useState<'list' | 'editor'>('list');
  const [templateId, setTemplateId] = useState<number | undefined>();
  const { templates, loading, reload, remove } = useTemplates();
  const [editorKey, setEditorKey] = useState(0);
  const editor = useTemplateEditor(templateId);

  const permissions = getPermissions();

  const canCreate = permissions.includes("plantillas.crear");
  const canEdit = permissions.includes("plantillas.editar");
  const canDelete = permissions.includes("plantillas.eliminar");

  if (mode === 'list') {
    return (
      <div className="px-8 py-8 mx-auto">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 py-12 justify-center">
            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Cargando plantillas…
          </div>
        ) : (
          <TemplatesList
            templates={templates}
            onCreate={
              canCreate
                ? () => {
                  setTemplateId(undefined);
                  setEditorKey(prev => prev + 1);
                  setMode("editor");
                }
                : undefined
            }
            onEdit={
              canEdit
                ? (id: number) => {
                  setTemplateId(id);
                  setEditorKey(prev => prev + 1);
                  setMode("editor");
                }
                : undefined
            }
            onDelete={
              canDelete
                ? remove
                : undefined
            }
          />
        )}
      </div>
    );
  }

  return (
    <div className="px-0 py-8 mx-auto flex flex-col gap-6">
      <button
        onClick={() => { setMode('list'); reload(); }}
        className="
          self-start inline-flex items-center gap-1.5
          px-4 py-3  rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03]
          hover:bg-gray-50 dark:hover:bg-white/[0.06] transition-all
        "
      >
        <div className='w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center'>
          <ArrowLeft size={18} className='text-gray-700 dark:text-gray-200' />
        </div>
        <div className='text-left'>
          <p className='text-sm font-semibold text-gray-900 dark:text-white'>

            Volver a plantillas
          </p>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            Regresar a la lista de automatizaciones
          </p>
        </div>
        <LayoutTemplate size={16} className='ml-2 text-gray-300 dark:text-gray-600' />
      </button>
      <TemplateEditor editor={editor} />
    </div>
  );
}
