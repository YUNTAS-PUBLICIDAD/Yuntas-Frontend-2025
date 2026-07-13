import { RiCloseFill } from "react-icons/ri";

interface CloseButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, className = "" }) => (
  <button
    onClick={onClick}
    aria-label="Cerrar"
    className={`absolute bg-[#F3F3F3] text-[#aaaaaa] rounded-full w-6 h-6 flex items-center justify-center cursor-pointer ${className}`}
  >
    <RiCloseFill size={22} />
  </button>
);

export default CloseButton;
