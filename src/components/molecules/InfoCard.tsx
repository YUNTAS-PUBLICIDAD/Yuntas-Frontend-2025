import React from "react";
import { MdCheck } from "react-icons/md";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";

interface InfoCardProps {
  text: string;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ text, className = "" }) => (
  <div
    className={`flex items-center gap-2 md:gap-6 rounded-lg p-1 md:p-4 w-full max-w-2xl  border-[#6DD0DB/20] shadow-lg ${className} min-h-[80px]`}
    style={{ background: "#6DD0DB33" }}
  >
    <Icon size="lg" bgColor="" className="">
      <MdCheck className="text-2xl md:text-4xl font-bold" />
    </Icon>
    <Text color="text-[#00031E]" variant="body" className="text-4xl font-bold break-words whitespace-pre-line">
      <div
            dangerouslySetInnerHTML={{
              __html: text,
            }}
      />
    </Text>
  </div>
);

export default InfoCard;
