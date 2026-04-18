import { LeadInput } from "@/types/admin/lead";

export interface PopupBaseProps {
  desktopImgSrc: string;
  textImgSrc?: string;
  mobileImgSrc?: string;
  imgAlt?: string;
  title: string;
  buttonText: string;
  buttonColor: string;
}

export interface PopupUIProps {
  withBackdrop?: boolean;
  muted?: boolean;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export interface PopupFormProps {
  formData: LeadInput;
  errors: Record<string, string>;
  handleChange: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  isSubmitting: boolean;

  buttonText: string;
  buttonColor?: string;
}

export interface PopupRendererProps extends PopupBaseProps, PopupUIProps {
  isOpen: boolean;
  // closing?: boolean;
  // onClose?: () => void;
  // withBackdrop?: boolean;
  // showCloseButton?: boolean;
  // previewDevice?: "auto" | "desktop" | "mobile";
  // muted?: boolean;
  // previewOnly?: boolean;
  previewDevice?: "auto" | "desktop" | "mobile";
  previewOnly?: boolean;
  form?: PopupFormProps; // 👈 opcional limpio
}
