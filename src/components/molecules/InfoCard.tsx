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
    className={`flex items-center gap-3 md:gap-6 rounded-lg p-2 md:p-4 w-full max-w-2xl border-[#6DD0DB/20] shadow-lg ${className} min-h-[60px] md:min-h-[80px]`}
    style={{ background: "#6DD0DB33" }}
  >
    <Icon size="lg" bgColor="" className="flex-shrink-0">
      <MdCheck className="text-xl md:text-4xl font-bold" />
    </Icon>
    <Text color="text-[#00031E]" variant="body" className="text-base md:text-4xl font-bold break-words whitespace-pre-line flex-1">
      <div
            dangerouslySetInnerHTML={{
              __html: text,
            }}
      />
    </Text>
  </div>
);

export default InfoCard;
