 'use client';

import Text from "@/components/atoms/Text";
import SectionImage from "@/components/atoms/SectionImage";
import { renderLinkMarkers } from "@/utils/renderLinkMarkers";
import { MdInfoOutline } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

type DescripcionSectionProps = {
	title: string;
	imageSrc: string;
    imageTitle: string;
    imageAlt: string;
	description: string;
};

const DescripcionSection = ({ title, imageSrc, imageTitle, imageAlt, description }: DescripcionSectionProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const getCollapsedHeight = () => {
        if (typeof window === "undefined") return 320;
        if (window.innerWidth >= 1024) return 320;
        if (window.innerWidth >= 768) return 260;
        return 220;
    };

    useEffect(() => {
        const checkOverflow = () => {
            const element = contentRef.current;

            if (!element) return;

            const collapsedHeight = getCollapsedHeight();
            setHasOverflow(element.scrollHeight > collapsedHeight + 8);
        };

        checkOverflow();

        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [description, isExpanded]);

    return (
        <section className="w-full py-12 md:py-14 bg-[#E2F6F6] relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#23C1DE]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#203565]/5 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="flex items-center gap-4 mb-10 md:mb-14">
                    <div className="w-14 h-14 rounded-2xl bg-[#203565] flex items-center justify-center shadow-md">
                        <MdInfoOutline className="text-3xl text-[#23C1DE]" />
                    </div>
                    <div>
                        <span className="text-sm md:text-base uppercase tracking-[0.25em] text-[#203565] font-bold">Detalles</span>
                        <Text variant="h2" color="text-[#203565]" className="font-bold">
                            INTRODUCCIÓN
                        </Text>
                    </div>
                </div>

                {/* CONTENIDO CON LAYOUT RESPONSIVO */}
                <div className="flex flex-col lg:flex-row lg:items-stretch items-start gap-12 lg:gap-20">
                    {/* TEXTO */}
                    <div className={`flex-1 w-full order-2 lg:order-1 ${isExpanded ? "lg:h-auto" : "lg:h-[500px]"}`}>
                        <div className={`bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg h-full flex flex-col transition-all duration-300 ${isExpanded ? "overflow-visible" : "overflow-hidden"}`}>
                            <div className="mb-6 pb-4 border-b border-[#E2F6F6]">
                                <span className="text-sm md:text-base uppercase tracking-[0.25em] text-[#23C1DE] font-bold leading-snug block">
                                    {title}
                                </span>
                            </div>

                            <div
                                ref={contentRef}
                                className={`prose prose-lg max-w-none flex-1 min-h-0 transition-[max-height] duration-300 ${
                                    isExpanded
                                        ? "max-h-none"
                                        : "overflow-hidden max-h-[220px] md:max-h-[260px] lg:max-h-[320px]"
                                }`}
                            >
                                <div className="text-[#00031E] font-normal leading-loose text-justify text-base md:text-lg lg:text-xl">
                                    {renderLinkMarkers(description || "")}
                                </div>
                            </div>

                            {hasOverflow && (
                                <div className="pt-4 flex justify-start">
                                    <button
                                        type="button"
                                        onClick={() => setIsExpanded((value) => !value)}
                                        className="inline-flex items-center gap-2 text-[#23C1DE] font-bold text-sm md:text-base hover:text-[#18879B] transition-colors"
                                    >
                                        {isExpanded ? "Ver menos" : "Ver más"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* IMAGEN */}
                    <div className="flex-shrink-0 w-full lg:w-[45%] order-1 lg:order-2 lg:h-[500px]">
                        <div className="relative group h-full">
                            {/* Glow effect */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#23C1DE] to-[#18879B] rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

                            <SectionImage
                                src={imageSrc}
                                alt={imageAlt}
                                title={imageTitle}
                                className="relative w-full h-full rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DescripcionSection;
