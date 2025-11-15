import React from "react";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import { FaStar } from "react-icons/fa";

interface TestimonialCardProps {
  name: string;
  initial: string;
  text: string;
  date: string;
  stars?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, initial, text, date, stars = 5 }) => (
  <div className="bg-white rounded-2xl shadow-lg pt-16 pb-6 px-8 flex flex-col items-center w-full max-w-xs min-h-[340px] relative">
    <Icon size="2xl" bgColor="bg-blue-900" className="absolute -top-12 left-1/2 -translate-x-1/2 text-white text-4xl font-bold shadow-lg">
      <span>{initial}</span>
    </Icon>
    <Text className="font-bold text-center mb-2 mt-8 uppercase tracking-wide text-lg">{name}</Text>
    <div className="flex gap-2 mb-3 justify-center">
      {Array.from({ length: stars }).map((_, i) => (
        <Icon key={i} size="md" bgColor="bg-transparent" className="text-yellow-400">
          <FaStar />
        </Icon>
      ))}
    </div>
    <Text variant="body" className="text-center mb-6 px-2 text-base">{text}</Text>
    <Text variant="small" className="absolute bottom-2 right-4 text-gray-500">Publicado: {date}</Text>
  </div>
);

export default TestimonialCard;
