// src/components/chat/Chat.tsx
import React, { useState } from "react";

export default function Chat({ serverId, user }: { serverId: string, user: string }) {
  const [messages, setMessages] = useState<{id:number, user:string, text:string}[]>([
    { id: 1, user: "system", text: "Добро пожаловать!" }
  ]);
  const [text, setText] = useState("");

  function send() {
    if (!text) return;
    setMessages(prev => [...prev, { id: Date.now(), user, text }]);
    setText("");
    // TODO: POST /messages + websocket emit
  }

  return (
    <div className="bg-gray-800 rounded p-4">
      <div className="h-64 overflow-y-auto mb-4 flex flex-col gap-2">
        {messages.map(m => (
          <div key={m.id} className={`p-2 rounded ${m.user === user ? "bg-indigo-700 self-end" : "bg-gray-700 self-start"}`}>
            <div className="text-xs text-gray-300">{m.user}</div>
            <div>{m.text}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 p-2 rounded bg-gray-700" placeholder="Сообщение..." />
        <button onClick={send} className="bg-indigo-600 px-4 py-2 rounded">Отправить</button>
      </div>
    </div>
  );
}
