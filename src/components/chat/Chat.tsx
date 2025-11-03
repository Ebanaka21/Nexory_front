import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import MessageInput from "./MessageInput";
import type { Message } from "../../types/types";

interface ChatProps {
  serverId: string;
  user: string;
}

const socket: Socket = io("http://localhost:3000");

export default function Chat({ serverId, user }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit("joinServer", serverId);

    socket.on("newMessage", (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [serverId]);

  const sendMessage = (msg: string) => {
    socket.emit("sendMessage", { serverId, user, message: msg });
  };

  return (
    <div>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i}><b>{m.user}:</b> {m.message}</div>
        ))}
      </div>
      <MessageInput onSend={sendMessage} />
    </div>
  );
}
