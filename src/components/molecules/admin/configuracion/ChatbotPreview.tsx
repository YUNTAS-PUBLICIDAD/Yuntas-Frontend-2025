"use client";

import { Bot, Send, RefreshCw, X } from "lucide-react";
import { getImg } from "@/utils/getImg";
import { ChatbotSettingsFormConfig } from "./configuracion.types";

interface ChatbotPreviewProps {
  config: ChatbotSettingsFormConfig;
}

export default function ChatbotPreview({ config }: ChatbotPreviewProps) {
  const primaryColor = config.primaryColor || "#203565";
  const secondaryColor = config.secondaryColor || primaryColor;
  const welcomeMessage = config.welcomeMessage || "Hola 👋 ¿En qué puedo ayudarte?";

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-sm font-semibold text-[#0D1030] dark:text-white">Vista previa</p>
        <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">
          Así verá el usuario el chatbot en tu sitio
        </p>
      </div>

      {/* Widget preview */}
      <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#151b38]">

        {/* Header */}
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}ee, ${primaryColor}bb)`,
          }}
        >
          <div className="flex items-center gap-2.5">
            {/* Avatar */}
            <div className="relative">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${primaryColor}33`, border: "2px solid rgba(255,255,255,0.3)" }}
              >
                {config.iconPreview ? (
                  <img
                    src={getImg(config.iconPreview)}
                    alt="bot"
                    className="w-5 h-5 object-contain rounded-full"
                  />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              {/* Online indicator */}
              <span className="absolute bottom-0 right-0 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 border border-white"></span>
              </span>
            </div>

            <div>
              <p className="text-xs font-bold text-white leading-tight">Asistente Yuntas</p>
              <p className="text-[10px] text-white/70">En línea</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-white/60" />
            <X className="w-3.5 h-3.5 text-white/60" />
          </div>
        </div>

        {/* Messages area */}
        <div className="bg-gray-100 dark:bg-white/5 px-3 py-4 min-h-[320px] flex flex-col gap-3">
          {/* Bot message */}
          <div className="flex items-start gap-2">
            {/* Mini avatar */}
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: primaryColor }}
            >
              {config.iconPreview ? (
                <img
                  src={getImg(config.iconPreview)}
                  alt="bot"
                  className="w-3 h-3 object-contain rounded-full"
                />
              ) : (
                <Bot className="w-3 h-3 text-white" />
              )}
            </div>

            <div
              className="px-3 py-2 rounded-2xl rounded-tl-sm text-xs leading-relaxed max-w-[80%] border"
              style={{
                backgroundColor: secondaryColor + "20",
                borderColor: secondaryColor + "40",
                color: "#374151",
              }}
            >
              {welcomeMessage}
            </div>
          </div>

         
          <div className="flex justify-end">
            <div
              className="px-3 py-2 rounded-2xl rounded-tr-sm text-xs text-white max-w-[70%]"
              style={{ backgroundColor: primaryColor }}
            >
              Quiero cotizar un proyecto
            </div>
          </div>
        </div>

        
        <div className="px-3 py-2.5 bg-white dark:bg-[#1C2347] border-t border-gray-100 dark:border-white/5 flex items-center gap-2">
          <div className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full px-3 py-1.5">
            <p className="text-[11px] text-gray-400 dark:text-white/30">Escribe un mensaje...</p>
          </div>
          <button
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: primaryColor }}
          >
            <Send className="w-3 h-3 text-white ml-0.5" />
          </button>
        </div>
      </div>

    </div>
  );
}