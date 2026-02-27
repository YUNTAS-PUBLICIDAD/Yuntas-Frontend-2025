import React from "react";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import { FaStar } from "react-icons/fa";

interface TestimonialCardProps {
  name: string;
  initial: string;
  text: React.ReactNode;
  date: string;
  stars?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, initial, text, date, stars = 5 }) => (
 <div className="bg-white rounded-[50px] shadow-lg pt-16 pb-6 px-8 
flex flex-col justify-between items-center 
w-full max-w-sm h-[420px] relative">
    <Icon size="2xl" bgColor="bg-blue-900" className="absolute -top-12 left-1/2 -translate-x-1/2 text-white text-4xl font-bold shadow-lg">
      <span>{initial}</span>
    </Icon>
<div className="flex flex-col items-center">
  <Text className="font-extrabold text-3xl text-black text-center mt-8 mb-3">
    {name}
  </Text>

  <div className="flex gap-2 mb-3 justify-center">
    {Array.from({ length: stars }).map((_, i) => (
      <Icon key={i} size="md" bgColor="bg-transparent" className="text-yellow-400">
        <FaStar />
      </Icon>
    ))}
  </div>

  <Text variant="body" className="text-center px-2 text-base">
    {text}
  </Text>
</div>

<button
  className="bg-teal-400 hover:bg-teal-500 text-black font-semibold px-6 py-2 rounded-full transition duration-300"
>
  VER TRABAJO
</button>
  </div>
);

export default TestimonialCard;
