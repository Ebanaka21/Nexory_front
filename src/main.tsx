import { useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/ui/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Chat from "./components/chat/Chat";
import './index.css';


export interface User {
  username: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
   <div className="min-h-screen bg-zinc-700 dark:bg-zinc-950 text-gray-100">
  <Header user={user} onLogout={() => setUser(null)} />

  <div className="container mx-auto p-6">
    {!user ? (
      <div className="flex flex-col md:flex-row gap-6">
        <Register />
        <Login onLogin={setUser} />
      </div>
    ) : (
      <Chat serverId="1" user={user.username} />
    )}
  </div>
</div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
