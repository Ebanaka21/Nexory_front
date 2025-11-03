import React, { useState } from "react";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Зарегистрирован: ${username}`);
  };

  return (
    <div className="bg-purple-800 p-6 rounded shadow-md flex-1">
      <h2 className="text-lg font-semibold mb-4">Регистрация</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 rounded bg-purple-700 text-gray-100 border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded text-white font-semibold"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Register;
