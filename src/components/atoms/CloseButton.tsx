
interface CloseButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode; // <-- Agregado
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`bg-gray-100 hover:bg-gray-200 text-gray-600
      rounded-full w-8 h-8 flex items-center justify-center
      transition-colors cursor-pointer text-sm z-10 ${className}`}
  >
    X
  </button>
);

export default CloseButton;
