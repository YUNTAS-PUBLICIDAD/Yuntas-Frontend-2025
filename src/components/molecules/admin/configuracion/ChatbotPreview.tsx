"use client";

import { Bot, Send, RotateCcw, X } from "lucide-react";
import { getImg } from "@/utils/getImg";
import { ChatbotSettingsFormConfig } from "./configuracion.types";

interface ChatbotPreviewProps {
  config: ChatbotSettingsFormConfig;
}

export default function ChatbotPreview({ config }: ChatbotPreviewProps) {
  const primaryColor = config.primaryColor || "#6DE1E3";
  const secondaryColor = config.secondaryColor || primaryColor;
  const welcomeMessage = config.welcomeMessages[0] || "Hola 👋 ¿En qué puedo ayudarte?";
  const iconSrc = config.iconPreviewUrl ?? (config.iconPreview ? getImg(config.iconPreview) : "");

  return (
   
    <div className="w-[315px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">

      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ background: `linear-gradient(135deg, ${primaryColor}ee, ${primaryColor}bb)` }}
      >
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${primaryColor}33`, border: "2px solid rgba(255,255,255,0.3)" }}
            >
              {iconSrc ? (
                <img src={iconSrc} alt="bot" className="w-7 h-7 object-contain rounded-full" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>
            <span className="absolute bottom-0 right-0 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 border border-white" />
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-white leading-tight">Asistente Yuntas</p>
            <p className="text-[10px] text-white/70">En línea</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
            <RotateCcw className="w-3 h-3 text-white/70" />
          </button>
          <button className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
            <X className="w-3.5 h-3.5 text-white/70" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-gray-50 px-3 py-4 h-[380px] flex flex-col gap-3 overflow-y-auto">
        <div className="flex items-start gap-2">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
            style={{ backgroundColor: primaryColor }}
          >
            {iconSrc ? (
              <img src={iconSrc} alt="bot" className="object-contain rounded-full" />
            ) : (
              <Bot className="w-3 h-3 text-white" />
            )}
          </div>
          <div
            className="px-3 py-2 rounded-2xl rounded-tl-sm text-xs leading-relaxed max-w-[80%] border text-[#374151]"
            style={{
              backgroundColor: secondaryColor + "20",
              borderColor: secondaryColor + "40",
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
            Hola, ¿qué servicios ofrecen?
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="px-3 py-2.5 bg-white border-t border-gray-100 flex items-center gap-2">
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
          <p className="text-[11px] text-gray-400">Escribe un mensaje...</p>
        </div>
        <button
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: primaryColor }}
        >
          <Send className="w-3 h-3 text-white ml-0.5" />
        </button>
      </div>
    </div>
  );
}