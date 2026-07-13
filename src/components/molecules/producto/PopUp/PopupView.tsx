import { LeadInput } from "@/types/admin/lead";
import PopupForm from "./PopupForm";
import PopupImage from "./PopUpImage";
import { PopupImageData } from "@/types/admin/popup";

// interface PopupImageData {
//   url: string;
//   alt?: string;
//   title?: string;
// }

interface PopupViewProps {
  isMobile?: boolean;
  leftImage?: PopupImageData;
  rightImage?: PopupImageData;
  mobileImage?: PopupImageData;
  formData: LeadInput;
  errors: Record<string, string>;
  handleChange: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
  buttonColor?: string;
  isSubmitting?: boolean;
}

export const PopupView = ({ ...props }: PopupViewProps) => {
  return (
    <>
      {props.isMobile ? (
        <div className="relative w-[320px] aspect-[320/603] mx-auto rounded-[2rem] overflow-hidden">
          {props.mobileImage && <PopupImage src={props.mobileImage.url} alt={props.mobileImage.alt || ""} title={props.mobileImage.title || ""} />}

          <div className="absolute bottom-0 left-0 right-0 px-[25px] md:px-8 pb-[23px] md:pb-4 md:pt-3 z-20 bg-transparent">
              {/*<PopupForm {...props} />*/}
              <PopupForm
                formData={props.formData}
                errors={props.errors}
                handleChange={props.handleChange}
                handleSubmit={props.handleSubmit}
                buttonText={props.buttonText}
                buttonColor={props.buttonColor}
                isSubmitting={props.isSubmitting ?? false}
              />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 w-[672px] aspect-[672/535] mx-auto">
          {props.leftImage && <PopupImage src={props.leftImage.url} alt={props.leftImage?.alt || ""} title={props.leftImage.title || ""} />}

          <div className="relative">
            {props.rightImage && <PopupImage src={props.rightImage.url} alt={props.rightImage?.alt || ""} title={props.rightImage.title  || ""} />}

            <div className="absolute inset-0 flex flex-col justify-end">
              <div className="h-[239px] bg-white backdrop-blur-md pb-[35px] px-[31px] w-full max-w-sm shadow-lg">
                {/*<PopupForm {...props} />*/}
                <PopupForm
                  formData={props.formData}
                  errors={props.errors}
                  handleChange={props.handleChange}
                  handleSubmit={props.handleSubmit}
                  buttonText={props.buttonText}
                  buttonColor={props.buttonColor}
                  isSubmitting={props.isSubmitting ?? false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
