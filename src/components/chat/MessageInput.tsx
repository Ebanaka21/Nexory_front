import { useState } from "react";

export default function MessageInput({ onSend }: { onSend: (msg: string) => void }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Введите сообщение" />
      <button onClick={handleSend}>Отправить</button>
    </div>
  );
}
