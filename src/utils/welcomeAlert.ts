import Swal from 'sweetalert2';

const roleLabels: Record<string, string> = {
  'admin': 'Admin',
  'marketing': 'Marketing',
  'diseño': 'Diseño',
};

function normalizeRole(role: string | null): string {
  if (!role) return 'Admin';
  const key = role.toLowerCase().trim();
  return roleLabels[key] ?? role;
}

export function showWelcomeAlert(isDarkMode: boolean, role: string | null) {
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches';
  const userName = normalizeRole(role);

  const colors = isDarkMode
    ? {
        background: '#131b3d',
        border: '#2a3363',
        checkBg: '#1a2350',
        checkColor: '#a89cf7',
        button: '#7c6fe0',
        text: '#ffffff',
        subtext: '#9aa3c7',
      }
    : {
        background: '#ffffff',
        border: '#e5e6ee',
        checkBg: '#efedfd',
        checkColor: '#7c6fe0',
        button: '#7c6fe0',
        text: '#1a1a2e',
        subtext: '#6b6b80',
      };

  Swal.fire({
    title: `${greet}, ${userName}`,
    text: 'Acceso verificado correctamente',
    icon: 'success',
    iconColor: colors.checkColor,
    confirmButtonText: 'Ir al panel',
    confirmButtonColor: colors.button,
    background: colors.background,
    color: colors.text,
    customClass: { popup: 'rounded-2xl' },
    backdrop: `rgba(0,0,0,0.5)`,
    didOpen: (popup) => {
      const container = document.querySelector('.swal2-container') as HTMLElement | null;
      if (container) {
        container.style.backdropFilter = 'blur(6px)';
        (container.style as any).webkitBackdropFilter = 'blur(6px)';
      }
      popup.style.border = `1px solid ${colors.border}`;

      const iconEl = popup.querySelector('.swal2-icon.swal2-success') as HTMLElement | null;
      if (iconEl) {
        iconEl.style.backgroundColor = colors.checkBg;
        iconEl.style.borderColor = colors.checkColor;
      }

      const contentEl = popup.querySelector('.swal2-html-container') as HTMLElement | null;
      if (contentEl) {
        contentEl.style.color = colors.subtext;
      }
    },
  });
}