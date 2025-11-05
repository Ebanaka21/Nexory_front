// src/App.tsx  (или src/app/pages/page.tsx)
import React, { useEffect, useState } from "react";
import Header from "../ui/Header";
import Chat from "../../components/chat/Chat";
import StartScreen from "../../components/startscreen/StartScreen";
import AuthModal from "../../components/modal/Auth.Modal";
import { checkAuth, logout } from "../../utils/auth";
import type { User } from "../../types/types";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState<"login" | "register" | null>(null);

  useEffect(()=> {
    checkAuth().then(u => { setUser(u); setLoading(false); }).catch(()=>setLoading(false));
  },[]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Загрузка…</div>;

  return (
    <div className="min-h-screen bg-zinc-900 text-gray-100">
      <Header user={user} onOpenLogin={()=>setShowAuth("login")} onOpenRegister={()=>setShowAuth("register")} onLogout={()=>{ logout(); setUser(null); }} />

      <div className="container mx-auto p-6">
        {user ? <Chat serverId="1" user={user.username || user.name || "anon"} /> : <StartScreen onOpenLogin={()=>setShowAuth("login")} onOpenRegister={()=>setShowAuth("register")} />}
      </div>

      {showAuth && <AuthModal mode={showAuth} onClose={()=>setShowAuth(null)} onSuccess={(u)=>{ setUser(u); setShowAuth(null); }} />}
    </div>
  );
}
