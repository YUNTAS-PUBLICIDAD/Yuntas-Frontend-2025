'use client';

import { useEffect, useRef, useState } from "react";
import { useSettings } from "@/hooks/useSettings";
import { showToast } from "@/utils/showToast";
import ChatbotSettingsSection from "@/components/molecules/admin/configuracion/ChatbotSettingsSection";
import AppearanceSettingsSection from "@/components/molecules/admin/configuracion/AppearanceSettingsSection";
import { ChatbotSettingsFormConfig } from "@/components/molecules/admin/configuracion/configuracion.types";
import ContactoSettingsSection from "@/components/molecules/admin/configuracion/ContactoSettingsSection";

const HEX_COLOR_REGEX = /^#[0-9A-Fa-f]{6}$/;

// ─── Main Form ────────────────────────────────────────────────────────────────
export default function ConfiguracionForm() {
  const {
    general,
    contact,
    chatbot,
    getSettings,
    saveGeneralSettings,
    saveContactSettings,
    saveChatbotSettings,
    isLoading,
    isSaving,
  } = useSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(true);
  const [config, setConfig] = useState<ChatbotSettingsFormConfig>({
    isActive: true,
    primaryColor: "#3D5BC9",
    secondaryColor: "#3D5BC9",
    position: "bottom-right",
    welcomeMessage: "¡Hola! Soy el asistente virtual de Yuntas.\n¿En qué puedo ayudarte hoy?",
    showAfterSeconds: "3",
    closeAfterSeconds: "300",
    iconPreview: null,
    iconFile: null,
  });

  useEffect(() => {
    getSettings();
  }, [getSettings]);

  useEffect(() => {
    if (!chatbot) return;

    setConfig((prev) => ({
      ...prev,
      isActive: !!chatbot.enabled,
      primaryColor: chatbot.primary_color || "#3D5BC9",
      secondaryColor: chatbot.secondary_color || chatbot.primary_color || "#3D5BC9",
      position: chatbot.position === "bottom-left" ? "bottom-left" : "bottom-right",
      welcomeMessage: chatbot.welcome_message || "",
      showAfterSeconds: String(chatbot.show_delay_seconds ?? 0),
      closeAfterSeconds:
        chatbot.auto_close_seconds === null || chatbot.auto_close_seconds === undefined
          ? "never"
          : String(chatbot.auto_close_seconds),
      iconPreview: chatbot.icon || null,
      iconFile: null,
    }));
  }, [chatbot]);

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setConfig((c) => ({ ...c, iconPreview: URL.createObjectURL(file), iconFile: file }));
  };

  const handleSave = async () => {
    if (!HEX_COLOR_REGEX.test(config.primaryColor)) {
      showToast.warning("El color principal debe tener formato #RRGGBB");
      return;
    }

    if (config.secondaryColor && !HEX_COLOR_REGEX.test(config.secondaryColor)) {
      showToast.warning("El color secundario debe tener formato #RRGGBB");
      return;
    }

    const showDelay = Number(config.showAfterSeconds);
    if (Number.isNaN(showDelay) || showDelay < 0) {
      showToast.warning("El tiempo para mostrar el chatbot debe ser un entero mayor o igual a 0");
      return;
    }

    const autoClose = config.closeAfterSeconds === "never" ? null : Number(config.closeAfterSeconds);
    if (autoClose !== null && (Number.isNaN(autoClose) || autoClose < 0)) {
      showToast.warning("El tiempo de cierre automatico debe ser un entero mayor o igual a 0");
      return;
    }

    const result = await saveChatbotSettings({
      enabled: config.isActive,
      primary_color: config.primaryColor,
      secondary_color: config.secondaryColor,
      icon: config.iconFile,
      position: config.position,
      welcome_message: config.welcomeMessage,
      show_delay_seconds: showDelay,
      auto_close_seconds: autoClose,
    });

    if (result.success) {
      showToast.success("Configuracion del chatbot guardada correctamente");
      await getSettings();
      return;
    }

    showToast.error(result.message || "No se pudo guardar la configuracion");
  };

  return (
    <div className="space-y-4">
      <ChatbotSettingsSection
        isOpen={isChatbotOpen}
        onToggleOpen={() => setIsChatbotOpen((current) => !current)}
        config={config}
        setConfig={setConfig}
        isLoading={isLoading}
        isSaving={isSaving}
        onSave={handleSave}
        fileInputRef={fileInputRef}
        onIconUpload={handleIconUpload}
      />
      <AppearanceSettingsSection
        general={general}
        isLoading={isLoading}
        isSaving={isSaving}
        onSave={saveGeneralSettings}
      />
      <ContactoSettingsSection
        contact={contact}
        isLoading={isLoading}
        isSaving={isSaving}
        onSave={saveContactSettings}
      />
    </div>
  );
}