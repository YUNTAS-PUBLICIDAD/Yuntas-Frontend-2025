// src/components/atoms/PopContainer.tsx
import React from "react";

interface PopupContainerProps {
  children: React.ReactNode;
  closing?: boolean;
}

const PopupContainer = React.forwardRef<HTMLDivElement, PopupContainerProps>(
  ({ children, closing = false }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-3xl shadow-xl w-[90vw] sm:w-full max-w-2xl
          bg-white overflow-hidden relative flex flex-col sm:flex-row
          border border-gray-300 min-h-[450px]
          ${closing ? "animate-slideOut" : "animate-slideIn"}`}
      >
        {children}
      </div>
    );
  }
);

PopupContainer.displayName = "PopupContainer";

export default PopupContainer;
