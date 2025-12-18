import React from 'react'
import Modal from '@/components/atoms/Modal'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import { deleteBlogAction } from '@/actions/blogActions'

type ConfirmarEleminarProps={
    isOpen:boolean;
    onClose:()=>void;
    id:number;
}

const ConfirmarEleminar = ({isOpen,onClose,id}:ConfirmarEleminarProps) => {
    const handleEliminar = async () => {
        try {
            await deleteBlogAction(id);
            onClose();
        } catch (error) {
            console.error('Error al eliminar el blog:', error);
        }
    }

    return (
        <Modal size='lg' title='Quiere eliminar' isOpen={isOpen} onClose={onClose}> 
            <Text>Desea eliminar este blog?</Text>
            <div>
                <Button onClick={handleEliminar} variant='danger'>Aceptar</Button>
                <Button onClick={onClose}>Cancelar</Button>
            </div>
        </Modal>
  )
}

export default ConfirmarEleminar