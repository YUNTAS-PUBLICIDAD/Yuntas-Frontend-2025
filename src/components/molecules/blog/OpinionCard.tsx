import React from "react";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import { FaStar } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";

interface OpinionCardProps {
  quote: string;
  description: string;
  author: string;
  stars?: number;
}

const OpinionCard: React.FC<OpinionCardProps> = ({
  quote,
  description,
  author,
  stars = 5,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full relative">
      <Text className="font-bold text-lg mb-4 ">
        <FaQuoteLeft className="inline-block " />{quote}
      </Text>
      <Text variant="body" className="text-gray-700 leading-relaxed mb-6">
        {description} <FaQuoteRight className="inline-block "/>
      </Text>
      <div className="flex gap-1 mb-2">
        {Array.from({ length: stars }).map((_, i) => (
          <Icon
            key={i}
            size="md"
            bgColor="bg-transparent"
            className="text-yellow-400"
          >
            <FaStar className="text-2xl"/>
          </Icon>
        ))}
      </div>
      <Text variant="small" className="text-right text-gray-600 font-medium mt-4">
        - {author}
      </Text>
    </div>
  );
};

export default OpinionCard;
