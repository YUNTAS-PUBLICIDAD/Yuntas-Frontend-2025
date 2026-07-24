export const adminSections = {
  general: { label: "General", href: "/admin" },
  seguimiento: { label: "Seguimiento", href: "/admin/seguimiento" },
  blogs: { label: "Blogs", href: "/admin/blogs" },
  productos: { label: "Productos", href: "/admin/productos" },
  usuarios: { label: "Usuarios", href: "/admin/usuarios" },
  reclamaciones: { label: "Reclamaciones", href: "/admin/reclamaciones" },
  contacto: { label: "Contacto", href: "/admin/contacto" },
  popups: { label: "Pop-ups", href: "/admin/popups" },
  templates: { label: "Plantillas", href: "/admin/templates" },
  configuracion: { label: "Configuracion", href: "/admin/configuracion" },
  historial: { label: "Historial", href: "/admin/historial" },
} as const;

export type AdminSectionKey = keyof typeof adminSections;

export const defaultAdminSection: AdminSectionKey = "general";

export function getAdminSectionKey(segment: string | null): AdminSectionKey {
  if (!segment) return "general";
  return segment in adminSections
    ? (segment as AdminSectionKey)
    : "general";
}