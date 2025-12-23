import { useState } from "react";
import Swal from "sweetalert2";
import { BlogInput } from "@/types/admin/blog";

type FieldType = "parrafos" | "beneficios";

export const useTextSelection = (
  blog: BlogInput,
  setBlog: React.Dispatch<React.SetStateAction<BlogInput>>
) => {
  const [field, setField] = useState<FieldType | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [range, setRange] = useState<{ start: number; end: number } | null>(null);
  const [selectedText, setSelectedText] = useState("");

  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const getTextareaId = (field: FieldType, index: number) =>
    field === "beneficios" ? `beneficio-${index}` : `parrafo-${index}`;

  const selectText = (field: FieldType, index: number): boolean => {
  const textarea = document.getElementById(
    getTextareaId(field, index)
  ) as HTMLTextAreaElement | null;

  if (!textarea) return false;

  const { selectionStart, selectionEnd, value } = textarea;

  if (selectionStart === selectionEnd) {
    Swal.fire(
      "Selecciona texto",
      "Selecciona una palabra o frase para insertar el enlace.",
      "warning"
    );
    return false; 
  }

  setField(field);
  setIndex(index);
  setRange({ start: selectionStart, end: selectionEnd });
  setSelectedText(value.substring(selectionStart, selectionEnd));

  return true;
};

  const insertHtml = (html: string) => {
    if (!field || index === null || !range) return;

    if (field === "parrafos") {
      const parrafos = [...(blog.parrafos ?? [])];
      const current = parrafos[index];

      parrafos[index] =
        current.slice(0, range.start) +
        html +
        current.slice(range.end);

      setBlog({ ...blog, parrafos });
    }

    if (field === "beneficios") {
      const beneficios = [...(blog.beneficios ?? [])];
      const current = beneficios[index];

      beneficios[index] =
        current.slice(0, range.start) +
        html +
        current.slice(range.end);

      setBlog({ ...blog, beneficios });
    }

    reset();
  };

  const insertLink = (url: string) => {
    const html = `<strong><a href="${url}" target="_blank" rel="noopener noreferrer">${selectedText}</a></strong>`;
    insertHtml(html);
  };
  const insertProduct = (producto: { link: string; nombre: string }) => {
    const html = `<strong><a href="/products/${producto.link}" title="${producto.nombre}">${selectedText}</a></strong>`;
    insertHtml(html);
  };
  const reset = () => {
    setField(null);
    setIndex(null);
    setRange(null);
    setSelectedText("");
    setIsLinkModalOpen(false);
    setIsProductModalOpen(false);
  };

  return {
    // abrir modales
    openLink: (field: FieldType, index: number) => {
        if (!selectText(field, index)) return;
        setIsLinkModalOpen(true);
    },
    openProduct: (field: FieldType, index: number) => {
       if (!selectText(field, index)) return;
       setIsLinkModalOpen(true);
    },

    // acciones
    insertLink,
    insertProduct,

    // estado
    isLinkModalOpen,
    isProductModalOpen,
    close: reset,
  };
};
