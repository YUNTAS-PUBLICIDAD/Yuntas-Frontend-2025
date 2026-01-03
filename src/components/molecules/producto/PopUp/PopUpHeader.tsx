import React from "react";
import CloseButton from "@/components/atoms/CloseButton";
import TitlePopup from "@/components/atoms/TitlePopup";

interface PopupHeaderProps {
  title: string;
  onClose?: () => void;
}

const PopupHeader: React.FC<PopupHeaderProps> = ({ title, onClose }) => (
  <div className="text-center mb-4 relative">
    <TitlePopup>{title}</TitlePopup>
  </div>
);

export default PopupHeader;
