import React from "react";
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
  image?: string; // Placeholder for character image
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, initial, text, date, stars = 5, image }) => (
  <div className="bg-[#f2f2f2] rounded-[3rem] shadow-xl pt-16 pb-8 px-8 flex flex-col items-center w-full max-w-[340px] min-h-[440px] relative border border-white/50">
    {/* Avatar / Character Icon Container */}
    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-[#203565] border-4 border-[#f2f2f2] shadow-xl flex items-center justify-center overflow-hidden z-20">
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        /* 
           TODO: Replace with character icons when available.
           Currently using initials as fallback.
        */
        <span className="text-white text-4xl font-black">{initial}</span>
      )}
    </div>

    {/* User Name */}
    <Text className="font-black text-center mb-1 mt-8 uppercase tracking-tight text-xl text-[#000]">
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
      className="text-center mb-8 px-2 text-[15px] leading-[1.4] text-[#1a1a1a] flex-grow font-medium"
      dangerouslySetInnerHTML={{ __html: text }}
    />

    {/* Action Button */}
    <Button
      variant="primary"
      size="sm"
      className="rounded-full px-10 py-3 text-sm font-black uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-md bg-[#23C1DE]"
    >
      VER TRABAJO
    </Button>
  </div>
);

export default TestimonialCard;
