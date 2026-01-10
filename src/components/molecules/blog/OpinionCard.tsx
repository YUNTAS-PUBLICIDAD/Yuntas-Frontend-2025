import React from "react";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import { FaStar } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";

interface OpinionCardProps {
  quote?: string;
  description: string | null;
  author?: string;
  stars?: number;
  className?:string
}

const OpinionCard: React.FC<OpinionCardProps> = ({
  quote,
  className,
  description,
  author,
  stars = 5,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 max-w-lg w-4/5 relative md:w-[400px] ">
      <Text className="font-bold text-lg mb-4 ">
        <FaQuoteLeft className="inline-block " />{quote}
      </Text>
      <Text variant="body" className="text-gray-700 leading-relaxed  md:mb-3 ">
           <div
            dangerouslySetInnerHTML={{
              __html: description ?? "",
            }}
          /> <FaQuoteRight className="inline-block "/>
      </Text>
      <div className="flex gap-1 md:mb-2">
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
      <Text variant="small" className="text-right text-gray-600 font-medium md:mt-4">
        - {author}
      </Text>
    </div>
  );
};

export default OpinionCard;
