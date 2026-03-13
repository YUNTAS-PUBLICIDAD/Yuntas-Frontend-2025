"use client";
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa';

type Message = {
  role: "user" | "bot"
  text?: string
  type?: string
  products?: any[]
  blogs?: any[]
  url?: string
  whatsapp_url?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");

function getImageUrl(url?: string) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_BASE}${url}`;
}

export const ChatbotWidget = () => {
 const [open, setOpen] = useState(false);
 const [messages, setMessages] = useState<Message[]>([]);
 const [input, setInput] = useState("");
 const [typing, setTyping] = useState(false);

 const sessionId = useRef<string>("");
 const bottomRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
    // SESSION
    let storedSession = localStorage.getItem("chatbot_session");

    if (!storedSession) {
     storedSession = crypto.randomUUID();
     localStorage.setItem("chatbot_session", storedSession);
    }

    sessionId.current = storedSession; 

    // LOCAL HISTORY
    const saved = localStorage.getItem("chatbot_messages");

    if (saved) {
     setMessages(JSON.parse(saved));
    }else {
      setMessages([
        {
          role: "bot",
          text: "Hola 👋 ¿Qué deseas hacer?",
          type: "quick"
        }
      ]);
    }

    // BACKEND HISTORY

    async function loadHistory(){
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chatbot/history/${sessionId.current}`);
      console.log("STATUS:", res.status);
      const text = await res.text();
      console.log("RAW RESPONSE:",text);
      const data = JSON.parse(text);
      console.log("PARSED:", data);
   
      if (data.length) {
      //  const formatted = data.map((m: any) => ({
      //   role: m.role,
      //   text: m.message,
      //   type: m.type,
      //   products: m.products,
      //   blogs: m.blogs,
      //   url: m.url
      //  }));
      //  setMessages(formatted);
      setMessages(data);
      }
    };
   
    loadHistory();
 }, [])
 
 useEffect(() => {
  bottomRef.current?.scrollIntoView({behavior: "smooth"});
 }, [messages, typing])
 
 async function sendMessage(text?: string){
  const messageText = text ?? input;
  if(!messageText.trim()) return;

  const userMessage: Message = {role: "user", text:messageText};
  // setMessages((prev) => [...prev, userMessage]);
  setMessages((prev) => {
    const updated = [...prev, userMessage];
    localStorage.setItem("chatbot_messages", JSON.stringify(updated));
    return updated;
  })
  setInput("");

  setTyping(true);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chatbot/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: messageText, session_id: sessionId.current})
  })

  const data = await res.json();

  setTyping(false);
  await new Promise((r) => setTimeout(r, 800));

  const botMessage: Message = {
    role: "bot",
    // text: data.reply,
    text: data.text,
    type: data.type,
    products: data.products,
    blogs: data.blogs,
    url: data.url,
    whatsapp_url: data.whatsapp_url
  };

  setMessages((prev) =>{ 
   const updated = [
    ...prev,
    botMessage
];
localStorage.setItem("chatbot_messages", JSON.stringify(updated));
return updated;
});
 }

  return (
     <div className="fixed bottom-8 right-6 z-50">

      {/* BOTÓN */}

      {!open && (
        // <button
        //   onClick={() => setOpen(true)}
        //   className="bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg"
        // >
        //   💬
        // </button>
        <div className='relative w-16 h-16 cursor-pointer' onClick={() => setOpen(true)}>
          {/* Halo animado */}
          <span className='absolute -inset-1 rounded-full bg-blue-400 opacity-50 animate-ping'></span>
          <Image src={"/images/chatbot.png"} alt='Abrir chat' fill className='relative rounded-full shadow-lg object-cover hover:scale-105 transition-transform duration-200'/>
        </div>
      )}

      {/* CHAT */}

      {open && (
        <div className="w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col">

          {/* HEADER */}

          <div className="bg-blue-600 text-white p-3 flex justify-between">
            <div className='flex items-center gap-2'>
              {/* Indicador activo */}
              <span className='relative flex h-3 w-3'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
              </span>
            <span>Asistente</span>
            </div>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* MENSAJES */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">

            {messages.map((m, i) => (

              <div
                key={i}
                // className={m.role === "user" ? "text-right" : "text-left"}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}
                // className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"} gap-2`}
              >

                {/* AVATAR BOT */}
                {
                  m.role === "bot" && (
                    <div className='w-7 h-7 relative flex-shrink-0'>
                      <Image alt='bot' fill className='rounded-full object-cover shadow' src="/images/chatbot.png"/>
                    </div>
                  )
                }
              {/* CONTENIDO DEL MENSAjE */}
<div className='flex flex-col gap-2'>

                {m.text && (
                  // <span className="inline-block bg-gray-100 px-2 py-1 rounded">
                  //   {m.text}
                  // </span>
                  // <span className={m.role === "user" ? "inline-block bg-blue-500 text-white px-3 py-1 rounded" : "inline-block bg-gray-100 px-3 py-1 rounded"}>
                  //   {
                  //     m.text
                  //   }
                  // </span>
                  <div
  className={`relative  px-3 py-2 rounded-2xl text-sm max-w-[70%] shadow whitespace-pre-wrap
  ${m.role === "user"
    ? "bg-blue-500 text-white rounded-br-none"
    : "bg-gray-100 text-gray-800 rounded-bl-none"
  }`}
>
  {m.text}

  {/* cola de burbuja */}
  <span
    className={`absolute bottom-0 w-3 h-3
    ${m.role === "user"
      ? "right-[-4px] bg-blue-500 rotate-45"
      : "left-[-4px] bg-gray-100 rotate-45"
    }`}
  ></span>
</div>
                )}

                {/* BOTONES RÁPIDOS */}

                {m.type === "quick" && (
                  <div className="flex flex-wrap gap-2 mt-2">

                    <button
                      onClick={() => sendMessage("productos")}
                      className="bg-gray-200 px-2 py-1 rounded text-sm"
                      >
                      Ver productos
                    </button>

                    <button
                      onClick={() => sendMessage("cotizar")}
                      className="bg-gray-200 px-2 py-1 rounded text-sm"
                      >
                      Cotizar
                    </button>

                    <button
                      onClick={() => sendMessage("contacto")}
                      className="bg-gray-200 px-2 py-1 rounded text-sm"
                      >
                      Hablar con asesor
                    </button>

                  </div>
                )}

                {/* PRODUCTOS */}

                {m.type === "products" && (
                  <div className=" flex flex-col gap-2 space-y-2 mt-2">

                    {m.products?.map((p) => (
                      
                      <a
                      key={p.id}
                      href={`/productos/${p.slug}`}
                      className="flex flex-col items-center border rounded-lg p-2 hover:bg-gray-50 transition"
                      >
                        {
                          p.images?.[0]?.url && (
                            <img 
                            // src={p.images[0].url}
                            src={getImageUrl(p.images?.[0]?.url)}
                             className='w-full h-24 object-cover rounded mb-1' alt="" />
                          )
                        }
                        <p className="font-semibold">{p.name}</p>
                      </a>

                    ))}

                  </div>
                )}

{/* </div> */}
                {/* PRODUCTO + WHATSAPP */}
{m.type === "product_contact" && (
  <div className="space-y-2 mt-2">

    {/* Productos */}
    {/* {m.products?.map((p) => (
      <a
        key={p.id}
        href={`/productos/${p.slug}`}
        className="block border rounded p-2 hover:bg-gray-50"
      >
        {p.images?.[0]?.url && (
          <img
            src={p.images[0].url}
            className="w-full h-24 object-cover rounded mb-1"
            alt={p.name}
          />
        )}
        <p className="font-semibold">{p.name}</p>
      </a>
    ))} */}

    {/* Productos si existen */}
    {m.products && m.products.length > 0 && m.products.map((p) => (
      // <a key={p.id} href={`/productos/${p.slug}`} className="block border rounded p-2 hover:bg-gray-50">
      //   {p.images?.[0]?.url && (
      //     <img src={p.images[0].url} className="w-full h-24 object-cover rounded mb-1" alt={p.name} />
      //   )}
      //   <p className="font-semibold">{p.name}</p>
      // </a>
      <a
    key={p.id}
    href={`/productos/${p.slug}`}
    className="flex items-center gap-3 border rounded-lg p-2 w-full max-w-[220px] hover:bg-gray-50 transition"
  >
    {p.images?.[0]?.url && (
      <img
        // src={p.images[0].url}
        src={getImageUrl(p.images?.[0]?.url)}
        className="w-12 h-12 object-cover rounded"
        alt={p.name}
      />
    )}

    <p className="text-sm font-medium leading-tight">
      {p.name}
    </p>
  </a>
    ))}

    {/* Botón WhatsApp */}
    {m.whatsapp_url && (
      <a
        href={m.whatsapp_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 mt-2 bg-green-500 hover:bg-green-600 text-white text-center rounded py-2 font-semibold transition-colors duration-200 shadow-sm hover:shadow"
      >
        Cotizar por WhatsApp <FaWhatsapp className='text-lg'/>
      </a>
    )}

  </div>
)}

                {/* BLOGS */}

                {m.type === "blogs" && (
                  <div className="space-y-2 mt-2">

                    {m.blogs?.map((b) => (

                      <a
                        key={b.id}
                        href={`/blog/${b.slug}`}
                        className="block border rounded p-2 hover:bg-gray-50"
                      >
                        {b.title}
                      </a>

                    ))}

                  </div>
                )}

                {/* CONTACTO */}

                {m.type === "contact" && m.url && (
                  <a
                    href={m.url}
                    className="block mt-2 bg-blue-600 text-white text-center rounded py-1"
                  >
                    Ir a contacto
                  </a>
                )}

              </div>
              </div>

            ))}

            {/* INDICADOR DE ESCRITURA */}

            {typing && (
              <div className="text-left">
                <span className="inline-block bg-gray-200 px-2 py-1 rounded animate-pulse">
                  escribiendo...
                </span>
              </div>
            )}

            <div ref={bottomRef}></div>

          </div>

          {/* INPUT */}

          <div className="p-2 flex gap-2">

            <input
            disabled={typing}
              className="border flex-1 rounded px-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>{
                if (e.key === "Enter") {
                 sendMessage()
                }
              }}
            />

            <button
            disabled={typing}
              onClick={() => sendMessage()}
              className="bg-blue-600 text-white px-3 rounded"
            >
              →
            </button>

          </div>

        </div>
      )}

    </div>
  )
}
