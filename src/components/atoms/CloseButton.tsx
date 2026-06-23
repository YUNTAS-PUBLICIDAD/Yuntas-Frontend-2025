import { RiCloseLargeLine } from "react-icons/ri";

interface CloseButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, className = "" }) => (
  <button
    onClick={onClick}
    aria-label="Cerrar"
    className={`absolute bg-[#E9E9E9] text-[#aaaaaa] rounded-full w-6 h-6 flex items-center justify-center cursor-pointer ${className}`}
  >
    <RiCloseLargeLine size={16} />
  </button>
);

export default CloseButton;
