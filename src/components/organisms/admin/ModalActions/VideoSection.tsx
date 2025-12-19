import React from 'react';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';
import { BlogInput } from '@/types/admin/blog';

type VideoSectionProps={
  setBlog: React.Dispatch<React.SetStateAction<BlogInput>>;
  blog?:BlogInput;
}
const VideoSection = ({setBlog,blog}:VideoSectionProps) => {
  return (
    <div className='bg-purple-50 p-4 sm:p-6 rounded-lg border border-purple-200'>
      <Text className='font-semibold text-purple-800 mb-3'>Video (Opcional)</Text>
      <Input
        borderColor='border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#23C1DE] focus:border-transparent transition-all'
        textLabel="URL del Video"
        placeholder="https://youtube.com/watch?v=... o https://vimeo.com/..."
        size="xxl"
        name='url_video'
        className='bg-white'
        rounded="rounded-[5px]"
        type="url"
        pattern="https?://.+"
        value={blog?.url_video}
        onChange={(e) =>
            setBlog(prev => ({
              ...prev,
              url_video: e.target.value,
            }))
          }      />
      <small className='text-gray-500 block mt-2'>
        Debe ser una URL completa (empezar con http:// o https://). Déjalo vacío si no tienes video.
      </small>
    </div>
  );
};

export default VideoSection;