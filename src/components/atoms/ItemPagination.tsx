import React from 'react'

type ItemPaginationProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

const ItemPagination = ({children, className, onClick, active = false,disabled = false }: ItemPaginationProps) => {
  
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };
  
  return (
    <div className={`rounded-full size-8 font-bold text-black  flex justify-center items-center transition-colors duration-200
                     ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-300 hover:text-black'
                     } ${active ? 'bg-[#0B0B1F] text-white hover:bg-[#0B0B1F]' : ''}${className || ''}`}
      onClick={handleClick}
      aria-disabled={disabled}
      aria-current={active ? 'page' : undefined}
      tabIndex={disabled ? -1 : 0}>
      {children}
    </div>
  )
}

export default ItemPagination