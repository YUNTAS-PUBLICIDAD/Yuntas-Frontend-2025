import React from 'react'
import Modal from '@/components/atoms/Modal'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import { deleteBlogAction } from '@/actions/blogActions'
import { Blog } from '@/types/admin/blog'
import { useBlogs } from '@/hooks/useBlog'
type ConfirmarEleminarProps={
    isOpen:boolean;
    onClose:()=>void;
    Blog:Blog;
    
}

const ConfirmarEleminar = ({isOpen,onClose,Blog}:ConfirmarEleminarProps) => {
    
    const {deleteBlog,getBlogs}=useBlogs();
    const handleDelete = async (id: number) => {
        const success = await deleteBlog(id);
        if (success) {
            alert("Blog eliminado correctamente");
            onClose();
            getBlogs(10);
        } else {
        alert("Error al eliminar el blog");
        }
    };
    return (
        <Modal size='lg' title='Desea eliminar este blog?' isOpen={isOpen} onClose={onClose}> 
            <Text variant='small'>{Blog.title}</Text>
            <Text variant='small'>{Blog.cover_subtitle}</Text>
            <div>
                <Button onClick={()=>handleDelete(Blog.id)} variant='danger'>Aceptar</Button>
                <Button onClick={onClose}>Cancelar</Button>
            </div>
        </Modal>
  )
}

export default ConfirmarEleminar