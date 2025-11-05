// src/components/modal/Auth.Modal.tsx
import React, { useState } from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";
import type { User } from "../../types/types";

type Props = {
  onClose: () => void;
  onSuccess: (user: User) => void;
  initialMode?: "login" | "register"; // <- добавляем
};

export default function AuthModal({ onClose, onSuccess, initialMode = "login" }: Props) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="rounded-xl p-6 max-w-[500px] w-full relative">
        <button onClick={onClose} className="absolute top-4 text-2xl right-0 z-20 text-zinc-400 hover:text-[#a96bfa]">✕</button>
        {mode === "login" ? (
          <Login
            onSuccess={onSuccess}
          />
        ) : (
          <Register
            onSuccess={onSuccess}
          />
        )}
        <div className="text-center mt-4 text-zinc-400 text-sm">
          {mode === "login" ? (
            <>
              Нет аккаунта?{" "}
              <button className="text-purple-400 underline" onClick={() => setMode("register")}>
                Зарегистрироваться
              </button>
            </>
          ) : (
            <>
              Уже есть аккаунт?{" "}
              <button className="text-purple-400 underline" onClick={() => setMode("login")}>
                Войти
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
