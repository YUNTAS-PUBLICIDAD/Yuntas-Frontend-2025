'use client';
import { useState } from 'react';
import { useTemplateEditor } from '@/hooks/useTemplateEditor';
import { useTemplates } from '@/hooks/useTemplates';
import { TemplateEditor } from './_components/TemplateEditor';
import { TemplatesList } from './_components/TemplateList';

export default function TemplatesPage() {
  const [mode, setMode] = useState<'list' | 'editor'>('list');
  const [templateId, setTemplateId] = useState<number | undefined>();
  const { templates, loading, reload, remove } = useTemplates();
  const [editorKey, setEditorKey] = useState(0);
  const editor = useTemplateEditor(templateId);

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
            onCreate={() => { setTemplateId(undefined); setEditorKey(prev => prev + 1);
            setMode('editor'); }}
            onEdit={(id: number) => { setTemplateId(id); setEditorKey(prev => prev + 1); setMode('editor'); }}
            onDelete={remove}
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
          text-sm text-gray-500 dark:text-gray-400
          hover:text-gray-900 dark:hover:text-white
          transition-colors
        "
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L6 8l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Volver a plantillas
      </button>
      <TemplateEditor editor={editor} />
    </div>
  );
}
