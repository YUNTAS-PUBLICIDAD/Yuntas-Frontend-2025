import React from 'react'
import Modal from '@/components/atoms/Modal'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import { showToast } from '@/utils/showToast'
import { Blog } from '@/types/admin/blog'
import { useBlogs } from '@/hooks/useBlog'
import { useRouter } from 'next/navigation'
type ConfirmarEleminarProps={
    isOpen:boolean;
    Blog:Blog;
    onClose:()=>void;
    onSuccess?:()=>void;
}

const ConfirmarEliminar = ({isOpen,onClose,Blog,onSuccess}:ConfirmarEleminarProps) => {
    
    const {deleteBlog,getBlogs}=useBlogs();
    const router = useRouter();
    const handleDelete = async (id: number) => {
        const success = await deleteBlog(id);
        if (success) {
            showToast.success("Blog eliminado correctamente");
            onClose();
            onSuccess?.();   
            getBlogs(10);
        } else {
            showToast.error("Error al eliminar el blog");
        }
        router.refresh();
    };
    return (
        <Modal size='lg' title='Desea eliminar este blog?' className='flex flex-col  ' isOpen={isOpen} onClose={onClose}> 
            <div className='grid place-self-center'>
                <Text variant='subtitle' className='font-semibold'>Titulo:   {Blog.title}</Text>
                <Text variant='small'>{Blog.cover_subtitle}</Text>
            </div>
            <div className='flex justify-center items-center mt-10 gap-10'>
                <Button onClick={()=>handleDelete(Blog.id)} variant='danger'>Aceptar</Button>
                <Button onClick={onClose}>Cancelar</Button>
            </div>
        </Modal>
  )
}

export default ConfirmarEliminar