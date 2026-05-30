'use client';
 
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { registerPageView } from '@/services/trackingService';
 
export default function PageTracker() {
  const pathname = usePathname();
 
  useEffect(() => {
    // 1. Obtener la sesión guardada en localStorage (si existe)
    const sessionId = localStorage.getItem('visitor_session_id') || undefined;
 
    // 2. Registrar la vista usando el servicio centralizado
    const trackPageView = async () => {
      try {
        const data = await registerPageView({
          route: pathname,
          session_id: sessionId,
        });
 
        // 3. Si el backend nos devolvió un session_id (nuevo o existente), guardarlo en localStorage
        if (data?.session_id) {
          localStorage.setItem('visitor_session_id', data.session_id);
        }
 
        console.log('[PageTracker] Vista de página registrada:', pathname, data);
      } catch (error) {
        console.error('[PageTracker] Error al registrar vista:', error);
      }
    };
 
    trackPageView();
  }, [pathname]);
 
  return null;
}
