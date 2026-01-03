import { ReactNode } from "react";

interface TitlePopupProps {
  children: ReactNode;
}

const TitlePopup: React.FC<TitlePopupProps> = ({ children }) => (
  <h2
    className="text-lg sm:text-3xl font-extrabold font-montserrat
    leading-tight text-center"
    style={{ color: "#0E3F88" }}
  >
    {children}
  </h2>
);

export default TitlePopup;
