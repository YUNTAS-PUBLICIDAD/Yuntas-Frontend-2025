"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import { ChatMessage } from '@/types/chatbot';
import { getChatHistoryService, sendChatMessageService } from '@/services/chatbotService';

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "";

function getImageUrl(url?: string) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_BASE}${url}`;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const sessionId = useRef<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //Limpieza de localStorage antiguo
    localStorage.removeItem("chatbot_session");
    localStorage.removeItem("chatbot_messages");

    //Se usa sessionStorage para que se borre el chat al cerrar la pestaña
    let storedSession = sessionStorage.getItem("chatbot_session");
    const saved = sessionStorage.getItem("chatbot_messages");
    
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([{ role: "bot", text: "Hola 👋 ¿Qué deseas hacer?", type: "quick" }]);
    }

    if (storedSession) {
      sessionId.current = storedSession;
      loadHistory(storedSession);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  async function loadHistory(id: string) {
    const res = await getChatHistoryService(id);
    if (res.success && res.data && res.data.length > 0) {
      // setMessages(res.data); 
    }
  }

  async function sendMessage(text?: string) {
    const messageText = text ?? input;
    if (!messageText.trim()) return;

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

  // Función para reiniciar el chat manualmente
  const resetChat = () => {
    sessionStorage.removeItem("chatbot_session");
    sessionStorage.removeItem("chatbot_messages");
    sessionId.current = "";
    setMessages([{ role: "bot", text: "Hola 👋 ¿Qué deseas hacer?", type: "quick" }]);
  };

  return (
    <div className="fixed bottom-40 right-10 z-[100]">
      
      {!open && (
        <button 
          onClick={() => setOpen(true)}
          className='relative w-16 h-16 cursor-pointer block rounded-full focus:outline-none border-none group shadow-xl'
          aria-label="Abrir chat"
        >
          <span className='absolute -inset-1 rounded-full bg-blue-400 opacity-50 animate-ping pointer-events-none'></span>
          <Image 
            quality={70}
            priority
            src={"/images/chatbot.png"} 
            alt='Abrir chat' 
            fill 
            className='relative rounded-full object-cover group-hover:scale-105 transition-transform duration-200 pointer-events-none'
          />
        </button>
      )}

      {open && (
        <div className="w-80 h-[450px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden animate-fade-in">
          
          <div className="bg-[#203565] text-white p-4 flex justify-between items-center">
            <div className='flex items-center gap-3'>
              <div className="relative">
                <div className='w-8 h-8 relative'>
                    <Image alt='bot avatar' fill className='rounded-full object-cover bg-white p-0.5' src="/images/chatbot.png"/>
                </div>
                <span className='absolute bottom-0 right-0 flex h-2.5 w-2.5'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border border-white'></span>
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">Asistente Yuntas</h3>
                <p className="text-[10px] text-blue-200">En línea</p>
              </div>
            </div>
            
            <div className="flex gap-3">
               {/* Botón para resetear chat */}
               <button onClick={resetChat} title="Reiniciar chat" className="text-white/70 hover:text-white transition-colors text-sm">↺</button>
               <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">✕</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                
                {m.role === "bot" && (
                  <div className='w-6 h-6 relative flex-shrink-0 mt-1'>
                    <Image alt='bot' fill className='rounded-full object-cover shadow-sm' src="/images/chatbot.png"/>
                  </div>
                )}
                
                <div className='flex flex-col gap-2 max-w-[75%]'>
                  {m.text && (
                    <div className={`relative px-4 py-2.5 text-sm shadow-sm whitespace-pre-wrap leading-relaxed
                      ${m.role === "user" 
                        ? "bg-[#6DE1E3] text-gray-900 rounded-2xl rounded-tr-sm" 
                        : "bg-white border border-gray-100 text-gray-700 rounded-2xl rounded-tl-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                  )}

                  {m.type === "quick" && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {['Productos', 'Cotizar', 'Contacto'].map(action => (
                         <button 
                           key={action} 
                           onClick={() => sendMessage(action === 'Productos' ? 'servicios' : action.toLowerCase())} 
                           className="bg-white border border-[#203565]/20 text-[#203565] hover:bg-[#203565] hover:text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-colors shadow-sm"
                         >
                           {action}
                         </button>
                      ))}
                    </div>
                  )}

                  {m.type === "products" && m.products && (
                    <div className="flex flex-col gap-2 mt-1">
                      {m.products.map((p) => (
                        <a key={p.id} href={`/productos/${p.slug}`} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-2 hover:shadow-md transition-shadow">
                          {p.images?.[0]?.url && (
                            <img src={getImageUrl(p.images[0].url)} className='w-12 h-12 object-cover rounded-lg' alt={p.name} />
                          )}
                          <p className="font-semibold text-xs text-gray-700 leading-tight">{p.name}</p>
                        </a>
                      ))}
                    </div>
                  )}

                  {m.type === "product_contact" && (
                    <div className="flex flex-col gap-2 mt-1">
                      {m.products?.map((p) => (
                        <a key={p.id} href={`/productos/${p.slug}`} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-2 hover:shadow-md transition-shadow">
                          {p.images?.[0]?.url && (
                            <img src={getImageUrl(p.images[0].url)} className="w-10 h-10 object-cover rounded-md" alt={p.name} />
                          )}
                          <p className="text-xs font-semibold text-gray-700 leading-tight">{p.name}</p>
                        </a>
                      ))}
                      {m.whatsapp_url && (
                        <a href={m.whatsapp_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 mt-1 bg-[#25D366] hover:bg-[#1EBE5C] text-white rounded-lg py-2 text-xs font-bold transition-colors shadow-sm">
                          Cotizar por WhatsApp <FaWhatsapp className='text-[15px]'/>
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

          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
            <input
              disabled={typing}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:border-[#6DE1E3] focus:bg-white transition-colors disabled:opacity-50"
              placeholder="Escribe un mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage() }}
            />
            <button
              disabled={typing || !input.trim()}
              onClick={() => sendMessage()}
              className="bg-[#203565] text-white w-10 h-10 rounded-full flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-shrink-0 shadow-sm"
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