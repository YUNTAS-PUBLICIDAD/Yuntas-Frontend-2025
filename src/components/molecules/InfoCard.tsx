import React from "react";
import { MdCheck } from "react-icons/md";

interface InfoCardProps {
	text: string;
	className?: string;
	index?: number;
	variant?: "default" | "accent";
}

const InfoCard: React.FC<InfoCardProps> = ({ text, className = "", index, variant = "default" }) => {
	return (
		<div
			className={`group relative flex items-start gap-4 rounded-2xl p-4 md:p-5 w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white border border-[#23C1DE]/20 ${className}`}
			style={{
				boxShadow: "0 8px 30px rgba(35,193,222,0.1)",
			}}
		>
			<div className="flex-shrink-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#23C1DE]/20 text-[#23C1DE] font-bold">
				{index !== undefined ? (
					<span className="text-sm md:text-base">{String(index + 1).padStart(2, "0")}</span>
				) : (
					<MdCheck className="text-xl md:text-2xl" />
				)}
			</div>
			<div className="flex-1 pt-1">
				<div
					className="text-[#00031E] text-base md:text-lg font-medium break-words whitespace-pre-line leading-relaxed"
					dangerouslySetInnerHTML={{
						__html: text,
					}}
				/>
			</div>
		</div>
	);
};

export default InfoCard;