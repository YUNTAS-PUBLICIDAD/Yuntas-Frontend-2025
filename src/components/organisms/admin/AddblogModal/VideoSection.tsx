import React from 'react';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';

const VideoSection = () => {
  return (
    <div className='bg-purple-50 p-4 sm:p-6 rounded-lg border border-purple-200'>
      <Text className='font-semibold text-purple-800 mb-3'>Video (Opcional)</Text>
      <Input
        textLabel="URL del Video"
        placeholder="https://youtube.com/watch?v=... o https://vimeo.com/..."
        size="xxl"
        className='bg-white'
        rounded="rounded-[5px]"
        name="url_video"
        type="url"
        pattern="https?://.+"
      />
      <small className='text-gray-500 block mt-2'>
        Debe ser una URL completa (empezar con http:// o https://). Déjalo vacío si no tienes video.
      </small>
    </div>
  );
};

export default VideoSection;