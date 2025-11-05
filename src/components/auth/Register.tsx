import React, { useState, useEffect } from "react";
import api, { setAuthToken } from "../../api/axios";
import type { User } from "../../types/types";

interface Props {
  onSuccess: (user: User) => void;
  hidden?: boolean;
}

export default function Register({ onSuccess, hidden }: Props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  if (hidden) return null;

  // функция для обработки ошибок
  function parseAndSetErrors(err: any) {
    setGeneralError("");
    const resp = err?.response;

    if (!resp) {
      setGeneralError(err?.message || "Ошибка соединения с сервером");
      return;
    }

    const data = resp.data;

  if (data?.errors) {
    const errorsText = Object.values(data.errors).flat().join(" ").toLowerCase();

    if (errorsText.includes("username") || errorsText.includes("email")) {
      setGeneralError("Никнейм или Email уже зарегистрированы");
    } else {
      setGeneralError(errorsText);
    }

      return;
    }

    if (data?.message) {
      setGeneralError(data.message);
      return;
    }

    setGeneralError(resp.statusText || `Ошибка ${resp.status}`);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setGeneralError("");

    if (!username.trim() || !email.trim() || !password.trim()) {
      setGeneralError("Все поля обязательны для заполнения");
      return;
    }
    if (!agreePrivacy) {
      setGeneralError("Вы должны согласиться с политикой конфиденциальности");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/register", { username, email, password });
      const { user, token } = res.data ?? {};

      if (!user || !token) {
        parseAndSetErrors({ response: { data: res.data, status: res.status, statusText: res.statusText } });
        return;
      }

      setAuthToken(token);
      localStorage.setItem("token", token);
      onSuccess(user);
    } catch (err: any) {
      parseAndSetErrors(err);
    } finally {
      setLoading(false);
    }
  }

  // авто-скрытие модалки через 4 секунды
  useEffect(() => {
    if (generalError) {
      const timer = setTimeout(() => setGeneralError(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [generalError]);

  return (
    <div className="relative">
      {/* Модалка ошибок сверху */}
      {generalError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-5 py-3 rounded-lg shadow-lg animate-slide-down">
          {generalError}
        </div>
      )}

      <form onSubmit={submit} className="bg-black border-b border-t p-8 border-[#7453D1] rounded-xl w-full shadow-xl mx-auto">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <i className="bx bx-user-plus text-purple-300" /> Регистрация
        </h3>

        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Никнейм"
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white border border-gray-700"
        />

        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white border border-gray-700"
        />

        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Пароль"
          type="password"
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white border border-gray-700"
        />

        <label className="flex items-center text-center gap-2 mb-6 text-gray-300">
          <input
            type="checkbox"
            checked={agreePrivacy}
            onChange={e => setAgreePrivacy(e.target.checked)}
            className="w-4 h-4 rounded border-gray-600 bg-gray-800"
          />
          Я согласен с <a href="/privacy" className="text-purple-400 underline">политикой конфиденциальности</a>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-purple-600 hover:to-indigo-500 text-white font-semibold rounded-md transition-all duration-200"
        >
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
}
