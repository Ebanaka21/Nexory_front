import React from "react";
import type { User } from "../../main";

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-zing-800 p-4 flex justify-between items-center shadow-sm">
      <h1 className="text-xl font-semibold text-gray-100">Nexory</h1>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-gray-300">Привет, {user.username}</span>
            <button
              onClick={onLogout}
              className="bg-zing-700 hover:bg-zinc-600 text-gray-100 px-3 py-1 rounded transition-colors duration-200"
            >
              Выйти
            </button>
          </>
        ) : (
          <span className="text-gray-400">Войдите или зарегистрируйтесь</span>
        )}
      </div>
    </header>
  );
};

export default Header;
