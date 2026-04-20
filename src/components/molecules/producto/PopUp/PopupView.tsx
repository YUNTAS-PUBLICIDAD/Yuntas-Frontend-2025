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
        <div className="relative w-[85vw] max-w-[320px] aspect-[284/535] mx-auto rounded-2xl overflow-hidden">
          {props.mobileImage && <PopupImage src={props.mobileImage.url} alt={props.mobileImage.alt || ""} title={props.mobileImage.title || ""} />}

          <div className="absolute inset-0 flex flex-col justify-end p-4">
            <div className="bg-black/5 backdrop-blur-sm p-4 rounded-xl">
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
      ) : (
        <div className="grid grid-cols-2 w-[672px] aspect-[672/535] mx-auto">
          {props.leftImage && <PopupImage src={props.leftImage.url} alt={props.leftImage?.alt || ""} title={props.leftImage.title || ""} />}

          <div className="relative">
            {props.rightImage && <PopupImage src={props.rightImage.url} alt={props.rightImage?.alt || ""} title={props.rightImage.title  || ""} />}

            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="bg-black/5 backdrop-blur-md p-5 rounded-xl w-full max-w-sm shadow-lg">
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
