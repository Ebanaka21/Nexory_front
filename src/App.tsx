// src/App.tsx
import React, { useEffect, useState } from "react";
import Header from "./app/ui/Header";
import Chat from "./components/chat/Chat";
import AuthModal from "./components/modal/Auth.Modal";
import { checkAuth, logout } from "./utils/auth";
import type { User } from "./types/types";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState<"login" | "register" | null>(null);

  useEffect(() => {
    checkAuth().then((u) => {
      setUser(u);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Загрузка…</div>;

  return (
    <div className="min-h-screen bg-zinc-900 text-gray-100">
      <Header
        user={user}
        onOpenLogin={() => setShowAuth("login")}
        onOpenRegister={() => setShowAuth("register")}
        onLogout={() => { logout(); setUser(null); }}
      />

      <div className="container mx-auto p-6">
        {user ? (
          <Chat serverId="1" user={user.username || user.name || "anon"} />
        ) : (
          // Пока пользователь не залогинен — показываем лендинг / приветствие без форм
          <div className="mx-auto max-w-3xl text-center py-20">
            <h2 className="text-4xl font-bold mb-4">Добро пожаловать в Nexory</h2>
            <p className="text-gray-400 mb-8">
              Это приватный чат. Нажмите <span className="text-purple-300 font-semibold">Войти</span> или <span className="text-purple-300 font-semibold">Регистрация</span> в шапке, чтобы открыть модалку.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowAuth("login")}
                className="px-5 py-2 rounded-md bg-transparent border border-purple-600 text-purple-200 hover:bg-purple-700/20 transition"
              >
                Войти
              </button>
              <button
                onClick={() => setShowAuth("register")}
                className="px-5 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-500 transition"
              >
                Зарегистрироваться
              </button>
            </div>
          </div>
        )}
      </div>

      {/* показываем модалку только если showAuth !== null */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(null)}
          onSuccess={(u: User) => { setUser(u); setShowAuth(null); }}
        />
      )}
    </div>
  );
}
