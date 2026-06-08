import React from 'react';
import Text from '@/components/atoms/Text';
import Banner from '@/components/atoms/Banner';
import DividerLine from '@/components/atoms/DividerLine';

interface StaticContentProps {
    bannerTitle: string;
    children: React.ReactNode;
}

const StaticContent: React.FC<StaticContentProps> = ({ bannerTitle, children }) => {
    return (
        <section className="pb-20">
            <div className="relative">
                <div className="w-full bg-gradient-to-r from-[#0a1a3a] via-[#0f2c5c] to-[#20838f] py-6 md:py-12 px-6 text-center shadow-sm">
                    <Text variant='banner' color='white' className='font-bold text-xl uppercase'>
                        {bannerTitle}
                    </Text>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 py-12 max-w-5xl">
                <div className="bg-white p-8 md:p-12 rounded-3xl [box-shadow:0_20px_25px_-5px_rgba(0,_0,_0,_0.15),_0_-10px_15px_-3px_rgba(0,_0,_0,_0.1)] border border-gray-100">
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StaticContent;
