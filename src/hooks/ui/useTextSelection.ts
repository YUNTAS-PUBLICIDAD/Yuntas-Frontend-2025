import { useState } from "react";
import Swal from "sweetalert2";
import { BlogInput } from "@/types/admin/blog";
import { Producto } from "@/types/admin/producto";

type FieldType = "description" | "testimonial" | "benefits";

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
    field === "benefits" ? `benefit-${index}` : `${field}-${index}`;

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

    if (field === "benefits") {
      const benefits = [...(blog.benefits ?? [])];
      const current = benefits[index];

      benefits[index] =
        current.slice(0, range.start) +
        html +
        current.slice(range.end);

      setBlog({ ...blog, benefits });
    }

    reset();
  };

  const insertLink = (url: string) => {
    const html = `<strong><a href="${url}" target="_blank" rel="noopener noreferrer">${selectedText}</a></strong>`;
    insertHtml(html);
  };

  const insertProduct = (producto: Producto) => {
    const html = `<strong><a href="/productos/${producto.slug}" title="${producto.name}">${selectedText}</a></strong>`;
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
    openLink: (field: FieldType, index: number) => {
        if (!selectText(field, index)) return;
        setIsLinkModalOpen(true);
    },
    openProduct: (field: FieldType, index: number) => {
       if (!selectText(field, index)) return;
       setIsProductModalOpen(true);
    },
    insertLink,
    insertProduct,
    isLinkModalOpen,
    isProductModalOpen,
    close: reset,
  };
};
