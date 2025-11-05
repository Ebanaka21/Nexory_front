// src/components/ui/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    // outer full-width stripe with exact bg color
    <footer className="w-full" style={{ backgroundColor: "#291A3D" }}>
      <div className="pt-10 pb-12">
        {/* centered inner container */}
        <div className="mx-auto w-full max-w-7xl px-6 flex flex-col items-center gap-6">
          {/* Логотип по центру */}
          <div className="flex justify-center w-full">
            <img
              src="/logo_full.svg"
              alt="Nexory Logo"
              className="block max-w-[500px] w-full h-auto"
              style={{ display: "block" }}
            />
          </div>

          {/* Ссылки */}
          <div className="flex flex-wrap gap-6 justify-center text-zinc-300">
            <a className="hover:text-white" href="/terms">Условия</a>
            <a className="hover:text-white" href="/privacy">Политика</a>
            <a className="hover:text-white" href="/contact">Контакты</a>
          </div>

          {/* Копирайт */}
          <div className="text-zinc-400 text-center">
            © {new Date().getFullYear()} Nexory. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
}
