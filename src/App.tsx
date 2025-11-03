import { useState } from "react";
import Header from "./components/ui/Header";
import Chat from "./components/chat/Chat";
import type { User } from "./types/types";
import './index.css';


export default function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} onLogin={setUser} />
      
      <main className="p-8">
        {user ? (
          <Chat serverId="1" user={user.username} />
        ) : (
          <p className="text-gray-700">Пожалуйста, войдите или зарегистрируйтесь.</p>
        )}
      </main>
    </div>
  );
}
