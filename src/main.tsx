// src/main.tsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./app/ui/Header";
import Footer from "./app/ui/Footer";
import StartScreen from "./components/startscreen/StartScreen";
import AuthModal from "./components/modal/Auth.Modal";
import type { User } from "./types/types";
import { checkAuth, logout } from "./utils/auth";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);

  useEffect(() => {
    checkAuth()
      .then((u) => setUser(u))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Загрузка…</div>;
  }

  return (
    <div className="min-h-screen bg-[#291A3D] text-white flex flex-col">
      <Header
        user={user}
        onOpenLogin={() => setAuthModal("login")}
        onOpenRegister={() => setAuthModal("register")}
        onLogout={handleLogout}
      />

      {!user && (
        <StartScreen
          onOpenLogin={() => setAuthModal("login")}
          onOpenRegister={() => setAuthModal("register")}
        />
      )}

      {authModal && (
        <AuthModal
          onClose={() => setAuthModal(null)}
          onSuccess={(u: User) => {
            setUser(u);
            setAuthModal(null);
          }}
          initialMode={authModal}
        />
      )}

      {user && (
        <div className="flex-1 flex items-center justify-center text-2xl">
          Добро пожаловать, {user.username || user.name}!
        </div>
      )}

      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
