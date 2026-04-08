import React from "react";
import Image from "next/image";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import { FaStar } from "react-icons/fa";
import Button from "@/components/atoms/Button";

interface TestimonialCardProps {
  name: string;
  initial: string;
  text: string;
  date: string;
  stars?: number;
  image?: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, initial, text, date, stars = 5, image, className = "" }) => (
  <div className={`bg-white/80 rounded-[3rem] shadow-2xl pt-16 pb-10 px-8 flex flex-col items-center w-full max-w-[340px] relative border border-white/30 ${className}`}>
    {/* Avatar / Character Icon Container */}
    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-[#203565] border-4 border-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex items-center justify-center overflow-hidden z-20">
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes="120px"
          className="object-cover rounded-full transform scale-[1.05]"
        />
      ) : (
        <span className="text-white text-4xl font-black">{initial}</span>
      )}
    </div>

    {/* Content Wrapper for proper alignment */}
    <div className="flex-1 flex flex-col items-center w-full">
      {/* User Name */}
      <Text className="font-black text-center mb-1 mt-8 uppercase tracking-tight text-xl text-black">
        {name}
      </Text>

      {/* Stars */}
      <div className="flex gap-1 mb-4 justify-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} className="text-[#FFC107] text-2xl drop-shadow-sm" />
        ))}
      </div>

      {/* Testimonial Text with support for bold formatting */}
      <div
        className="text-center mb-8 px-2 text-[15px] leading-[1.4] text-[#1a1a1a] font-medium"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>

    {/* Action Button - Pulled to bottom by flex-1 above */}
    <Button
      variant="primary"
      size="sm"
      className="rounded-full px-10 py-3 text-sm font-black uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-md !bg-[#5ec7ca] !text-black mt-auto"
    >
      VER TRABAJO
    </Button>
  </div>
);

export default TestimonialCard;
