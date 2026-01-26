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
                <DividerLine className="relative z-[1]" />
                <Banner className="relative z-[5]">
                    <Text variant='banner' color='white' className='font-bold text-xl uppercase'>
                        {bannerTitle}
                    </Text>
                </Banner>
            </div>

            <div className="container mx-auto px-6 md:px-12 py-12 max-w-5xl">
                <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg border border-gray-100">
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StaticContent;
