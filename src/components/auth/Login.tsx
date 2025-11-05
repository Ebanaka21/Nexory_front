// src/components/auth/Login.tsx
import React, { useState, useEffect } from "react";
import api, { setAuthToken } from "../../api/axios";
import type { User } from "../../types/types";

interface Props {
  onSuccess: (user: User) => void;
  hidden?: boolean;
}

export default function Login({ onSuccess, hidden }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [showErrorModal, setShowErrorModal] = useState(false);

  if (hidden) return null;

  function parseLoginError(err: any) {
    console.error("Login error raw:", err);

    let messages: string[] = [];

    if (!err) {
      messages = ["Неизвестная ошибка"];
    } else {
      const resp = err.response;
      if (!resp) {
        messages = [err.message || "Ошибка соединения"];
      } else {
        const data = resp.data;
        if (data) {
          if (data.message) messages.push(data.message);
          if (data.errors) {
            messages.push(...Object.values(data.errors).flat());
          }
          if (typeof data === "string") {
            messages.push(data.replace(/(<([^>]+)>)/gi, "").trim());
          }
        } else {
          messages.push(resp.statusText || `Ошибка ${resp.status}`);
        }
      }
    }

    setErrorMessages(messages);
    setShowErrorModal(true);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessages([]);
    setShowErrorModal(false);
    setLoading(true);

    try {
      const res = await api.post("/login", { email, password });
      const { user, token } = res.data ?? {};

      if (!user || !token) {
        parseLoginError({ response: { data: res.data, status: res.status, statusText: res.statusText } });
        return;
      }

      setAuthToken(token);
      localStorage.setItem("token", token);
      onSuccess(user);
    } catch (err: any) {
      parseLoginError(err);
    } finally {
      setLoading(false);
    }
  }

  // Авто скрытие модалки через 5 секунд
  useEffect(() => {
    if (showErrorModal) {
      const timer = setTimeout(() => setShowErrorModal(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showErrorModal]);

  return (
    <div className="relative flex justify-center items-center ">
      {/* Модальное окно ошибок */}
      {showErrorModal && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white p-4 rounded-xl shadow-lg max-w-sm w-full animate-fadeIn animate-slideDown">
          <h4 className="font-semibold mb-2">Ошибка</h4>
          <ul className="list-disc list-inside text-sm">
            {errorMessages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
          <button
            onClick={() => setShowErrorModal(false)}
            className="mt-2 text-red-200 underline hover:text-white text-sm"
          >
            Закрыть
          </button>
        </div>
      )}

      {/* Форма входа */}
      <form
        onSubmit={submit}
        className="bg-black border-b border-t border-[#7453D1] p-8 rounded-xl w-full shadow-xl mx-auto"
      >
        <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3 justify-start">
          <i className="bx bx-log-in text-purple-400" /> Вход
        </h3>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          className="w-full p-4 mb-4 rounded-xl bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none transition"
          required
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          type="password"
          className="w-full p-4 mb-6 rounded-xl bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none transition"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-purple-600 hover:to-indigo-500 rounded-xl text-white font-semibold transition duration-300"
        >
          {loading ? "Вход..." : "Войти"}
        </button>
      </form>

      {/* Анимации Tailwind через keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translate(-50%, -20px); }
          to { transform: translate(-50%, 0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
      `}</style>
    </div>
  );
}
