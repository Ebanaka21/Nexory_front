// src/components/ui/Header.tsx
import React from "react";
import type { User } from "../../types/types";
import Container from "./Container";

interface Props {
  user: User | null;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onLogout: () => void;
}

const Header: React.FC<Props> = ({ user, onOpenLogin, onOpenRegister, onLogout }) => {
  return (
    <header className="w-full shadow-md bg-[#291A3D] border-b border-gray-700 ">
      <Container className="flex justify-between items-center py-4">
        {/* Левый блок - пустой для баланса */}
        <div className="flex-1" />

        {/* Центр - логотип */}
        <div className="flex justify-center flex-1">
          <img src="/logo.svg" alt="Nexory Logo" className="h-20 w-auto" />
        </div>

        {/* Правый блок - кнопки */}
        <div className="flex justify-end flex-1 gap-4 items-center">
          {user ? (
            <>
              <span className="text-gray-200 font-medium">Привет, {user.username || user.name}</span>
              <button
                onClick={onLogout}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-semibold transition-all duration-200"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onOpenLogin}
                className="bg-transparent border border-purple-500 text-purple-200 px-4 py-2 rounded-md hover:bg-purple-700/30 font-medium transition-all duration-200"
              >
                Войти
              </button>
              <button
                onClick={onOpenRegister}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 font-semibold transition-all duration-200"
              >
                Регистрация
              </button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
