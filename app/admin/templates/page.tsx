'use client';

import { useState } from 'react';
import { useTemplateEditor } from '@/hooks/useTemplateEditor';
import { useTemplates } from '@/hooks/useTemplates';

import { TemplateEditor } from './_components/TemplateEditor';
import { TemplatesList } from './_components/TemplateList';

export default function TemplatesPage() {
  const [mode, setMode] = useState<'list' | 'editor'>('list');
  const [templateId, setTemplateId] = useState<number | undefined>();

  const { templates, loading, reload , remove} = useTemplates();
  const editor = useTemplateEditor(templateId);


  // =========================
  // LIST VIEW
  // =========================
  if (mode === 'list') {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <TemplatesList
            templates={templates}
            onCreate={() => {
              setTemplateId(undefined);
              setMode('editor');
            }}
            onEdit={(id: number) => {
              setTemplateId(id);
              setMode('editor');
            }}
            onDelete={remove}
          />
        )}
      </div>
    );
  }

  // =========================
  // EDITOR VIEW
  // =========================
  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-4">

      <button
        onClick={() => {
          setMode('list');
          reload(); // 🔥 refresca lista
        }}
      >
        ← Volver
      </button>

      <TemplateEditor editor={editor} />

    </div>
  );
}
