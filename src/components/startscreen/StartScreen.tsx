// src/components/startscreen/StartScreen.tsx
import { useEffect, useRef, useState } from "react";
import "boxicons/css/boxicons.min.css";

type Props = {
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
};

const features = [
  { icon: "bx-chat", title: "Приватные чаты", desc: "Безопасные приватные диалоги с end-to-end подходом (в будущем). Быстрые и удобные." },
  { icon: "bx-headphone", title: "Голосовые комнаты", desc: "Создавай голосовые комнаты для команд и друзей — низкая задержка и управление доступом." },
  { icon: "bx-shield-quarter", title: "Безопасность", desc: "JWT-аутентификация, защищённый gateway и базовая валидация — безопасность на сервере." },
  { icon: "bx-cloud-lightning", title: "Микросервисы", desc: "Архитектура на отдельных сервисах: auth, messages, gateway, notifications, voice." },
  { icon: "bx-rocket", title: "Лёгкий запуск", desc: "Разворачивай локально: gateway на 8002, auth на 8000 — всё готово для разработки." },
  { icon: "bx-collection", title: "Интуитивный UI", desc: "Чистый, тёмный интерфейс, быстрый доступ к чатам и профилю. Будет допилен под mobile." },
];

const chatPresets = [
  [
    { from: "friend", text: "Привет! Как дела?" },
    { from: "me", text: "Привет! Все отлично, а у тебя?" },
    { from: "friend", text: "Тоже хорошо, спасибо!" },
  ],
  [
    { from: "friend", text: "Слушай, видел новый сериал?" },
    { from: "me", text: "Да, понравился! А ты?" },
    { from: "friend", text: "Еще нет, надо глянуть" },
  ],
  [
    { from: "friend", text: "Эй, перезагрузи страницу, у меня баг" },
    { from: "me", text: "Окей, сейчас попробую" },
    { from: "friend", text: "Спасибо, работает!" },
  ],
];

export default function StartScreen({ onOpenLogin, onOpenRegister }: Props) {
  const [visibleMessages, setVisibleMessages] = useState<{ from: string; text: string }[]>([]);
  const [typing, setTyping] = useState(false);

  // храним все id таймеров, чтобы чистить
  const timersRef = useRef<number[]>([]);
  // флаг, чтобы при параллельных эффект вызовах избежать лишней очистки / гонки
  const runningRef = useRef(false);

  useEffect(() => {
    // если уже запущено — разрешаем, но дедуплирование защитит от дубликатов.
    // однако лучше один раз установить runningRef чтобы бОльше контроля — но
    // не блокируем повторные монтирования (на prod это нормально).
    if (runningRef.current) {
      // если эффект уже был запущен и не успел очиститься — ничего не делаем
      return;
    }
    runningRef.current = true;

    // выбираем случайный пресет
    const preset = chatPresets[Math.floor(Math.random() * chatPresets.length)];

    // очистим старые сообщения (чтобы при релоаде не накапливались)
    setVisibleMessages([]);

    let i = 0;

    function clearAllTimers() {
      timersRef.current.forEach((id) => clearTimeout(id));
      timersRef.current = [];
    }

    function schedule(fn: () => void, ms: number) {
      const id = window.setTimeout(fn, ms);
      timersRef.current.push(id);
    }

    function showNext() {
      if (i >= preset.length) {
        setTyping(false);
        return;
      }

      setTyping(true);
      const msg = preset[i];
      const typingTime = Math.max(200, msg.text.length * 70); // min delay 200ms

      schedule(() => {
        // дедуплицируем: если последнее сообщение такое же — не добавляем
        setVisibleMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.text === msg.text && last.from === msg.from) {
            // уже есть такое — пропускаем добавление (защита от параллельных запусков)
            return prev;
          }
          return [...prev, msg];
        });

        i++;
        if (i < preset.length) {
          // небольшой естественный промежуток перед следующим набором
          schedule(() => {
            showNext();
          }, 350 + Math.random() * 300);
        } else {
          setTyping(false);
        }
      }, typingTime);
    }

    // стартуем с небольшой задержкой, чтобы выглядило естественно
    schedule(() => showNext(), 400 + Math.random() * 300);

    return () => {
      // cleanup при размонтировании — критично
      clearAllTimers();
      runningRef.current = false;
      setTyping(false);
    };
    // пустой deps, чтобы запускаться только на монтировании
  }, []);

  return (
    <div className="text-white bg-black rounded-2xl">
      {/* HERO */}
      <section className="py-20 text-center pb-10">
  <div className="max-w-[1200px] w-full mx-auto border-t-4 border-b-4 border-[#7453D1] mt-5 pb-14 bg-zinc-800/60 rounded-3xl px-4 sm:px-6 lg:px-10">
    <div className="mx-auto max-w-4xl">
      <div className="inline-block mb-4 rounded-lg px-4 py-2 text-xs font-semibold bg-[#7453D1]">
        Private chat · Alpha
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
        <span className="text-[#7453D1]">Nexory</span> — приватный чат и голосовые комнаты
      </h1>

      <p className="text-zinc-300 max-w-2xl mx-auto mb-8 text-sm sm:text-base">
        Быстрые приватные диалоги, голосовые каналы и управление пользователями. Лёгкая микросервисная архитектура для масштабирования.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <button
          onClick={onOpenLogin}
          className="px-6 py-3 rounded-md border border-purple-600 text-purple-200 hover:bg-purple-700/20 transition w-full sm:w-auto"
        >
          Войти
        </button>
        <button
          onClick={onOpenRegister}
          className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-95 transition w-full sm:w-auto"
        >
          Зарегистрироваться
        </button>
      </div>

      {/* Чат-мокап */}
      <div className="mx-auto max-w-sm sm:max-w-md">
        <div
          className="relative rounded-2xl overflow-hidden border border-zinc-700 shadow-lg"
          style={{ background: "linear-gradient(180deg, rgba(31,20,49,0.6), rgba(12,10,15,0.6))" }}
        >
          {/* header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#2b1838] to-[#251226]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-lg font-bold">
              А
            </div>
            <div className="text-left">
              <div className="font-medium">Александр</div>
              <div className="text-xs text-zinc-400">В сети</div>
            </div>
            <div className="ml-auto text-zinc-400 text-sm">• • •</div>
          </div>

          {/* messages */}
          <div className="p-4 space-y-3 min-h-[140px]">
            {visibleMessages.map((m, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] break-words px-4 py-2 rounded-lg ${
                  m.from === "me"
                    ? "ml-auto bg-gradient-to-br from-purple-600 to-indigo-600 text-white"
                    : "mr-auto bg-gray-800 text-zinc-100"
                }`}
              >
                {m.text}
              </div>
            ))}

            {typing && (
              <div className="max-w-[35%] px-3 py-2 rounded-lg mr-auto bg-gray-800 text-zinc-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse delay-150" />
                <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse delay-300" />
              </div>
            )}
          </div>

          {/* footer */}
          <div className="px-4 py-3 border-t border-zinc-700 bg-gradient-to-t from-black/30 to-transparent">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-10 rounded-full bg-zinc-800/60 px-4 flex items-center text-zinc-400">
                Написать сообщение...
              </div>
              <button className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
                <i className="bx bx-send" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* end chat-mockup */}
    </div>
  </div>
</section>


      {/* 6 BLOCKS */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-5 shadow-md hover:-translate-y-1 transition-transform">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-600 text-white text-xl shadow-sm">
                    <i className={`bx ${f.icon}`} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{f.title}</h4>
                    <p className="text-zinc-300 mt-1 text-sm">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXTRA CTA / WHY */}
      <section className="py-12 border-t border-zinc-700/40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h3 className="text-2xl font-bold mb-3">Почему Nexory?</h3>
          <p className="text-zinc-300 mb-6">Мы фокусируемся на простоте, скорости и удобстве разработки — от локального старта до масштабируемого продакшена.</p>
          <div className="flex items-center justify-center gap-4">
            <button onClick={onOpenRegister} className="px-5 py-3 rounded-md bg-purple-600 text-white hover:bg-purple-500 transition">Попробовать — бесплатно</button>
            <a className="px-5 py-3 rounded-md border border-zinc-700 text-zinc-200 hover:bg-zinc-800/40" href="/docs">Документация</a>
          </div>
        </div>
      </section>

      <style>{`
        .delay-150 { animation-delay: 0.12s; }
        .delay-300 { animation-delay: 0.24s; }
        .animate-pulse { animation: pulse 1s infinite; }
        @keyframes pulse {
          0% { opacity: 0.9; transform: translateY(0); }
          50% { opacity: 0.3; transform: translateY(-2px); }
          100% { opacity: 0.9; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
