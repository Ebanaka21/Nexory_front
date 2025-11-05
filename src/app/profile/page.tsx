// app/profile/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStoredToken, isTokenValid } from "@/lib/auth";

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const t = getStoredToken();
    if (!t || !isTokenValid(t)) {
      router.push("/"); // если неавторизован — на старт
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#1C0E2D] text-white flex items-center justify-center">
      <div className="max-w-2xl w-full p-8">
        <h1 className="text-3xl font-bold mb-4">Профиль пользователя</h1>
        <p className="text-white/80">Здесь будет твой профиль — заготовка готова.</p>
      </div>
    </div>
  );
}
