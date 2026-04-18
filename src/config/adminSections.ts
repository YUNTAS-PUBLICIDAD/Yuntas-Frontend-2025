export const adminSections = {
  seguimiento: { label: "Seguimiento", href: "/admin/seguimiento" },
  blogs: { label: "Blogs", href: "/admin/blogs" },
  productos: { label: "Productos", href: "/admin/productos" },
  usuarios: { label: "Usuarios", href: "/admin/usuarios" },
  reclamaciones: { label: "Reclamaciones", href: "/admin/reclamaciones" },
  contacto: { label: "Contacto", href: "/admin/contacto" },
  popups: { label: "Pop-ups", href: "/admin/popups" },
  templates: {label: "Plantillas", href: "/admin/templates"}
} as const;

export type AdminSectionKey = keyof typeof adminSections;

export const defaultAdminSection: AdminSectionKey = "seguimiento";

export function getAdminSectionKey(segment: string | null): AdminSectionKey {
  return segment && segment in adminSections
    ? (segment as AdminSectionKey)
    : defaultAdminSection;
}
