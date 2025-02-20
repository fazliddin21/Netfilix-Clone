// app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative h-screen bg-black text-white">
      {/* Yarım shaffof qora qatlam */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-opacity-70 bg-black"></div>

      <div className="relative z-10 flex justify-center items-center h-full text-center">
        <div className="space-y-6">
          <h1 className="text-7xl font-bold mb-4 text-gradient">
            404
          </h1>
          <p className="text-3xl font-semibold">
            Sahifa topilmadi!
          </p>
          <p className="text-lg mb-6">
            Siz kiritgan URL mavjud emas. Iltimos,
            sahifani tekshirib ko'ring.
          </p>

          {/* Bosh sahifaga qaytish tugmasi */}
          <Link
            className="inline-block bg-red-600 text-white py-3 px-8 rounded-lg text-xl font-semibold transform transition-transform hover:scale-105 hover:bg-red-700 duration-300"
            href="/"
          >
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>

      {/* Pastki qismga eslatma qo'shish */}
      <div className="absolute bottom-10 left-10 text-white text-sm opacity-60">
        <p>Netflix Clone by YourName</p>
      </div>
    </div>
  );
}
