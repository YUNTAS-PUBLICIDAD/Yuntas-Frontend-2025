import React from 'react'

type ItemPaginationProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
}

const ItemPagination = ({ children, className, onClick, active = false, disabled = false, "aria-label": ariaLabel }: ItemPaginationProps) => {

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className={`rounded-full size-8 font-bold flex justify-center items-center transition-colors duration-200
                     ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } 
      ${active 
        ? 'bg-[#0B0B1F] text-white hover:bg-[#0B0B1F] dark:bg-[#293296] dark:text-white dark:hover:bg-[#0D1030]' 
        : 'text-black hover:bg-gray-300 dark:text-white dark:bg-[#151A3D] dark:hover:bg-brand-blue'
      }${className || ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label={ariaLabel}
      aria-disabled={disabled}
      aria-current={active ? 'page' : undefined}
      tabIndex={disabled ? -1 : 0}>
      {children}
    </div>
  )
}

export default ItemPagination