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
    className={`flex items-center gap-6 rounded-lg p-4 w-full max-w-2xl border border-cyan-300 shadow-lg ${className} min-h-[80px]`}
    style={{ background: "#6DD0DB33" }}
  >
    <Icon size="lg" bgColor="bg-blue-100" className="text-blue-600">
      <MdCheck className="text-3xl" />
    </Icon>
    <Text color="text-blue-900" variant="body" className="text-4xl font-extrabold break-words whitespace-pre-line">{text}</Text>
  </div>
);

export default InfoCard;
