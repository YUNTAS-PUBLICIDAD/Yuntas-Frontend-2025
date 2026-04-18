import PopupForm from "../producto/PopUp/PopupForm";
import { PopupDesktop } from "./PopupDesktop";
import { PopupMobile } from "./PopupMobile";
import { PopupRendererProps } from "./types";

export const PopupRenderer = ({
  isOpen,
  previewOnly = false,
  form,
  previewDevice = "auto",
  withBackdrop = true,
  muted = false,
  ...ui
}: PopupRendererProps) => {
  if (!isOpen) return null;

  const showForm = !previewOnly && !!form;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">

      {previewDevice !== "mobile" && (
        <PopupDesktop {...ui}>
          {showForm && (
            <PopupForm {...form!} />
          )}
        </PopupDesktop>
      )}

      {previewDevice !== "desktop" && (
        <PopupMobile {...ui}>
          {showForm && (
            <PopupForm {...form!} />
          )}
        </PopupMobile>
      )}

    </div>
  );
};
