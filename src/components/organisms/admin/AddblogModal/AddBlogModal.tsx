'use client';

import React, { useState } from 'react';
import ContenidoBlog from './ContenidoBlog';
import ImagenesSection from './ImagenesSection';
import ProductoSeoSection from './ProductoSeoSection';
import VideoSection from './VideoSection';
import Modal from '@/components/atoms/Modal';
import Button from '@/components/atoms/Button';
import { createBlogAction } from '@/actions/blogActions';
import Loader from '@/components/atoms/Loader';

interface Props {
  openModal: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AddBlogModal = ({ openModal, onClose, onSuccess }: Props) => {
  const [beneficios, setBeneficios] = useState<string[]>(['']);
  const [parrafos, setParrafos] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    // Validaciones básicas
    const form = e.currentTarget;

    setIsSubmitting(true);

    try {
      
      const formData = new FormData(form);

      // Limpiar y agregar beneficios
      const beneficiosFiltrados = beneficios.filter(b => b.trim() !== '');
      formData.delete('beneficios[]');
      beneficiosFiltrados.forEach((beneficio) => {
        formData.append('beneficios[]', beneficio.trim());
      });

      // Limpiar y agregar párrafos
      const parrafosFiltrados = parrafos.filter(p => p.trim() !== '');
      formData.delete('parrafos[]');
      parrafosFiltrados.forEach((parrafo) => {
        formData.append('parrafos[]', parrafo.trim());
      });

      // Construir objeto SEO
      const metaTitulo = formData.get('meta_titulo') as string;
      const metaDescripcion = formData.get('meta_descripcion') as string;
      if (metaTitulo || metaDescripcion) {
        const seoData = {
          meta_titulo: metaTitulo || '',
          meta_descripcion: metaDescripcion || '',
        };
        formData.set('etiqueta', JSON.stringify(seoData));
      }
      formData.delete('meta_titulo');
      formData.delete('meta_descripcion');

      // Llamar al Server Action
      const result = await createBlogAction(formData);
      if (!result.success) {
        setError(result.message || 'Error al crear el blog');
        return;
      }
      // Éxito
      alert(`${result.message}`);
      // Resetear formulario
      setBeneficios(['']);
      setParrafos(['']);
      form.reset();
      // Callback de éxito (para refrescar lista)
      if (onSuccess) {
        onSuccess();
      }
      onClose();

    } catch (error) {
      console.error(' [CLIENT] Error al enviar formulario:', error);
      setError('Error inesperado al crear el blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal size="lg" title="Agregar nuevo blog" isOpen={openModal} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Mostrar errores */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl"></span>
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 mb-1">Error</h3>
                <p className="text-sm text-red-700 whitespace-pre-line">{error}</p>
              </div>
              <button
                type="button"
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <ProductoSeoSection />
        <ImagenesSection />
        <VideoSection />
        <ContenidoBlog
          beneficios={beneficios}
          setBeneficios={setBeneficios}
          parrafos={parrafos}
          setParrafos={setParrafos}
        />

        <div className="flex gap-3 mt-8 pt-4 border-t">
          <Button 
            type="submit" 
            variant="success" 
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? <Loader /> : '✅ Crear Blog'}
          </Button>
          <Button 
            type="button" 
            onClick={onClose} 
            disabled={isSubmitting}
            variant="secondary"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBlogModal;