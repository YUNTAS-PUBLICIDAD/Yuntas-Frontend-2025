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
        className={`rounded-3xl shadow-xl w-[90vw] max-w-[284px] md:max-w-[672px] overflow-hidden relative
          ${closing ? "animate-slideOut" : "animate-slideIn"}`}
      >
        {children}
      </div>
    );
  }
);

PopupContainer.displayName = "PopupContainer";

export default PopupContainer;
