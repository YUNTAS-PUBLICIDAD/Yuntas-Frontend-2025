import { ChatbotPosition } from "@/types/admin/settings";

export interface ChatbotSettingsFormConfig {
  isActive: boolean;
  primaryColor: string;
  secondaryColor: string;
  position: ChatbotPosition;
  welcomeMessage: string;
  showAfterSeconds: string;
  closeAfterSeconds: string;
  iconPreview: string | null;
  iconFile: File | null;
}
