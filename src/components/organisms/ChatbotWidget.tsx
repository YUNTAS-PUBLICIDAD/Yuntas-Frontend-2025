"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import { ChatMessage } from '@/types/chatbot';
import { getChatHistoryService, sendChatMessageService } from '@/services/chatbotService';
import { getSettingsService } from '@/services/settingsService';
import { ChatbotSettings } from '@/types/admin/settings';
import { usePathname } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_URL || "";

const DEFAULT_SETTINGS: ChatbotSettings = {
  enabled: true,
  primary_color: "#203565",
  secondary_color: "#203565",
  icon: null,
  position: "bottom-right",
  welcome_message: "Hola 👋 ¿En qué puedo ayudarte?",
  show_delay_seconds: 3,
  auto_close_seconds: null,
};

function renderCTA(message: ChatMessage) {
  switch (message.type) {
    case 'whatsapp':
      return (
        <a
          href={message.whatsapp_url || getAdviserWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.97] rounded-lg py-2 text-xs font-bold"
        >
          <FaWhatsapp className='text-base group:scale-110 transition-transform' />
          Hablar con asesor
        </a>
      );
    case "contact_page":
      return (
        <a
          href={message.url}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#203565] to-[#1e3a8a] text-white rounded-xl py-2.5 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.97]"
        >
          Ir a contacto
        </a>
      );
    default:
      return null;
  }
}

function getWhatsappUrl(productName: string) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const text = encodeURIComponent(`Hola, estoy interesado en ${productName}`);
  return `http://wa.me/${phone}?text=${text}`;
}

function getAdviserWhatsappUrl() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const text = encodeURIComponent(`Hola Yuntas, quisiera conversar con un asesor comercial para que me brinde más información, por favor.`);
  return `http://wa.me/${phone}?text=${text}`;
}

function getImageUrl(url?: string) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}


function getChatbotIconUrl(icon?: string | null): string | null {
  if (!icon) return null;
  if (icon.startsWith("http")) return icon;
  
  const backendBase = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "";
  return `${backendBase}${icon.startsWith("/") ? "" : "/"}${icon}`;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  // Settings dinámicos 
  const [settings, setSettings] = useState<ChatbotSettings>(DEFAULT_SETTINGS);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  // Burbuja de atracción y botón flotante
  const [showButton, setShowButton] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleState, setBubbleState] = useState<'typing' | 'text'>('typing');
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  // Ref para el timer de cierre automático
  const autoCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sessionId = useRef<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // ── Cargar settings e inicializar mensajes ────────────────────────────────
  useEffect(() => {
    localStorage.removeItem("chatbot_session");
    localStorage.removeItem("chatbot_messages");

    const storedSession = sessionStorage.getItem("chatbot_session");
    const saved = sessionStorage.getItem("chatbot_messages");

    if (storedSession) {
      sessionId.current = storedSession;
      loadHistory(storedSession);
    }

    
    getSettingsService().then((result) => {
      let chatbotSettings = DEFAULT_SETTINGS;
      if (result.success && result.data?.chatbot) {
        chatbotSettings = result.data.chatbot;
        setSettings(chatbotSettings);
      }
      setSettingsLoaded(true);

      
      if (saved) {
        setMessages(JSON.parse(saved));
        setHasOpenedOnce(true);
      } else {
       
        const welcomeText = chatbotSettings.welcome_message || "Hola 👋 ¿En qué puedo ayudarte?";
        setMessages([{ role: "bot", text: welcomeText, type: "quick" }]);
      }
    }).catch(() => {
      setSettingsLoaded(true);
      if (!saved) {
        setMessages([{ role: "bot", text: DEFAULT_SETTINGS.welcome_message!, type: "quick" }]);
      } else {
        setMessages(JSON.parse(saved));
        setHasOpenedOnce(true);
      }
    });
  }, []);

  // Scroll automático al final en nuevos mensajes o al escribir
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Burbuja llamativa 
  useEffect(() => {
    if (!settingsLoaded) return;
    if (!settings.enabled) return;
    if (hasOpenedOnce || open) return;

    const delayMs = (settings.show_delay_seconds ?? 3) * 1000;

    const initialTimer = setTimeout(() => {
      setShowButton(true);
      setShowBubble(true);
      setBubbleState('typing');

      const textTimer = setTimeout(() => {
        setBubbleState('text');
      }, 2000);

      return () => clearTimeout(textTimer);
    }, delayMs);

    return () => clearTimeout(initialTimer);
  }, [settingsLoaded, settings.enabled, settings.show_delay_seconds, hasOpenedOnce, open]);

  // ── Cierre automático por inactividad ─────────────────────────────────────
  const resetAutoCloseTimer = () => {
    if (!settings.auto_close_seconds) return;
    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    autoCloseTimerRef.current = setTimeout(() => {
      setOpen(false);
    }, settings.auto_close_seconds * 1000);
  };

  useEffect(() => {
    if (open && settings.auto_close_seconds) {
      resetAutoCloseTimer();
    }
    return () => {
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    };
  }, [open, settings.auto_close_seconds]);

  async function loadHistory(id: string) {
    const res = await getChatHistoryService(id);
    if (res.success && res.data && res.data.length > 0) {
      // reservado para historial futuro
    }
  }

  async function sendMessage(text?: string) {
    const messageText = text ?? input;
    if (!messageText.trim()) return;

    resetAutoCloseTimer();

    const userMessage: ChatMessage = { role: "user", text: messageText };
    setMessages((prev) => {
      const updated = [...prev, userMessage];
      sessionStorage.setItem("chatbot_messages", JSON.stringify(updated));
      return updated;
    });

    setInput("");
    setTyping(true);

    const res = await sendChatMessageService(messageText, sessionId.current);
    setTyping(false);
    resetAutoCloseTimer();

    if (res.success && res.data) {
      if (!sessionId.current && res.data.conversation_id) {
        sessionId.current = res.data.conversation_id;
        sessionStorage.setItem("chatbot_session", res.data.conversation_id);
      }

      const latestMessages = res.data.messages;
      if (latestMessages && latestMessages.length > 0) {
        const botMessages = latestMessages.filter((m: any) => m.sender === 'bot' || m.role === 'bot');
        if (botMessages.length > 0) {
          const backendBotMsg = botMessages[botMessages.length - 1];
          const botMessage: ChatMessage = {
            role: "bot",
            text: backendBotMsg.message_text || backendBotMsg.text,
            type: backendBotMsg.metadata?.type || backendBotMsg.type,
            products: backendBotMsg.metadata?.products || backendBotMsg.products,
            blogs: backendBotMsg.metadata?.blogs || backendBotMsg.blogs,
            url: backendBotMsg.metadata?.url || backendBotMsg.url,
            whatsapp_url: backendBotMsg.metadata?.whatsapp_url || backendBotMsg.whatsapp_url,
          };
          setMessages((prev) => {
            const updated = [...prev, botMessage];
            sessionStorage.setItem("chatbot_messages", JSON.stringify(updated));
            return updated;
          });
        }
      }
    }
  }

  const resetChat = () => {
    sessionStorage.removeItem("chatbot_session");
    sessionStorage.removeItem("chatbot_messages");
    sessionId.current = "";
    const welcomeText = settings.welcome_message || "Hola 👋 ¿En qué puedo ayudarte?";
    setMessages([{ role: "bot", text: welcomeText, type: "quick" }]);
  };

  const handleOpenChat = () => {
    setOpen(true);
    setHasOpenedOnce(true);
    setShowBubble(false);
    setShowButton(true);
    resetAutoCloseTimer();
  };

  // No renderizar en admin
  if (pathname?.startsWith("/admin")) return null;
  // Esperar settings antes de mostrar cualquier cosa (evita flash del ícono por defecto)
  if (!settingsLoaded) return null;
  // No renderizar si está desactivado
  if (!settings.enabled) return null;

  const iconUrl = getChatbotIconUrl(settings.icon);
  const primaryColor = settings.primary_color || "#203565";
  const secondaryColor = settings.secondary_color || primaryColor;
  const positionClass = settings.position === "bottom-left"
    ? "fixed bottom-7 left-4 z-[100]"
    : "fixed bottom-7 right-4 z-[100]";

  return (
    <div className={positionClass}>
      {!open && showButton && (
        <div className="relative flex flex-col items-end">
          {showBubble && (
            <div
              className="absolute bottom-full mb-1 right-16 bg-white border border-gray-200 px-4 py-2.5 rounded-2xl rounded-br-sm shadow-xl z-10 animate-fade-in origin-bottom-right transition-all cursor-pointer"
              onClick={handleOpenChat}
            >
              {bubbleState === 'typing' ? (
                <div className="flex gap-1.5 items-center h-5 px-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              ) : (
                <p className="text-sm font-bold text-gray-700 whitespace-nowrap drop-shadow-sm">
                  ¡Hola! ¿Cotizamos tu proyecto? 👋
                </p>
              )}
            </div>
          )}

          <button
            onClick={handleOpenChat}
            className="relative w-20 h-20 cursor-pointer block rounded-full focus:outline-none border-none group"
            aria-label="Abrir chat"
          >
            {iconUrl ? (
              // Ícono personalizado
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg animate-bot-life group-hover:scale-105 transition-transform duration-200"
                style={{ backgroundColor: primaryColor }}
              >
                <img
                  src={iconUrl}
                  alt="Abrir chat"
                  className="w-12 h-12 object-contain rounded-full"
                />
              </div>
            ) : (
              // Ícono por defecto si no hay configuración o mientras se carga
              <Image
                quality={70}
                priority
                src="/images/chatbot.webp"
                alt="Abrir chat"
                fill
                className="animate-bot-life relative rounded-full object-cover group-hover:scale-105 transition-transform duration-200 pointer-events-none"
              />
            )}
          </button>
        </div>
      )}

      {open && (
        <div className="w-[380px] h-[600px] sm:w-[420px] sm:h-[650px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden animate-fade-in">

          {/* Header con color primario */}
          <div
            className="relative text-white p-4 flex justify-between items-center"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}dd, ${primaryColor}bb, ${primaryColor}99)`
            }}
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_60%)]"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <div className="w-9 h-9 relative">
                  {iconUrl ? (
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${primaryColor}33`, border: "2px solid rgba(255,255,255,0.3)" }}
                    >
                      <img src={iconUrl} alt="bot avatar" className="w-6 h-6 object-contain rounded-full" />
                    </div>
                  ) : (
                    <Image alt="bot avatar" fill className="rounded-full object-cover bg-white p-0.5" src="/images/chatbot.webp" />
                  )}
                </div>
                <span className="absolute bottom-0 right-0 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border border-white"></span>
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">Asistente Yuntas</h3>
                <p className="text-[11px] text-white/70">En línea</p>
              </div>
            </div>
            <div className="flex gap-3 relative z-10">
              <button onClick={resetChat} title="Reiniciar chat" className="text-white/70 hover:text-white transition text-sm">↺</button>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition">✕</button>
            </div>
          </div>

          {/* Mensajes */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100"
            onMouseMove={resetAutoCloseTimer}
            onKeyDown={resetAutoCloseTimer}
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                {m.role === "bot" && (
                  <div className="w-6 h-6 relative flex-shrink-0 mt-1">
                    {iconUrl ? (
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <img src={iconUrl} alt="bot" className="w-4 h-4 object-contain rounded-full" />
                      </div>
                    ) : (
                      <Image alt="bot" fill className="rounded-full object-cover shadow-sm" src="/images/chatbot.webp" />
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-2 max-w-[75%]">
                  {m.text && (
                    <div
                      className={`relative px-4 py-2.5 text-sm shadow-sm whitespace-pre-wrap leading-relaxed
                        ${m.role === "user"
                          ? "text-white rounded-2xl rounded-tr-sm"
                          : "border rounded-2xl rounded-tl-sm"
                        }`}
                      style={
                        m.role === "user"
                          ? { backgroundColor: primaryColor }
                          : {
                              backgroundColor: secondaryColor + "20",
                              borderColor: secondaryColor + "40",
                              color: "#374151",
                            }
                      }
                    >
                      {m.text}
                    </div>
                  )}

                  {renderCTA(m)}

                  {m.type === "products" && m.products && (
                    <div className="flex flex-col gap-2 mt-1">
                      {m.products.map((p) => (
                        <div
                          key={p.id}
                          className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                          {p.image && (
                            <a href={`/productos/${p.slug}`} className="block relative w-full h-36 overflow-hidden">
                              <img
                                src={getImageUrl(p.image)}
                                alt={p.name}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                            </a>
                          )}
                          <div className="p-3 flex flex-col gap-2">
                            <p className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">{p.name}</p>
                            <span className="text-base font-bold" style={{ color: primaryColor }}>S/ {p.price}</span>
                            <a
                              href={getWhatsappUrl(p.name)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.97]"
                            >
                              <FaWhatsapp className="text-base" />
                              Cotizar
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {m.type === "product_contact" && (
                    <div className="flex flex-col gap-2 mt-1">
                      {m.products?.map((p) => (
                        <a key={p.id} href={`/productos/${p.slug}`} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-2 hover:shadow-md transition-shadow">
                          <p className="text-xs font-semibold text-gray-700 leading-tight">{p.name}</p>
                        </a>
                      ))}
                      {m.whatsapp_url && (
                        <a href={m.whatsapp_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 mt-1 bg-[#25D366] hover:bg-[#1EBE5C] text-white rounded-lg py-2 text-xs font-bold transition-colors shadow-sm">
                          Cotizar por WhatsApp <FaWhatsapp className="text-[15px]" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex gap-2 justify-start items-center ml-8">
                <div className="bg-white border border-gray-100 px-3 py-2 rounded-2xl rounded-tl-sm shadow-sm flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
            <div ref={bottomRef}></div>
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
            <input
              disabled={typing}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:border-blue-300 focus:bg-white transition-colors disabled:opacity-50"
              placeholder="Escribe un mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
            />
            <button
              disabled={typing || !input.trim()}
              onClick={() => sendMessage()}
              className="text-white w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0 shadow-sm"
              style={{ backgroundColor: primaryColor }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1">
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}