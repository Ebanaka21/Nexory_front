import React from "react";
import type { PropsWithChildren } from "react";

interface ContainerProps {
  className?: string;
  bgColor?: string; // фон контейнера (по умолчанию прозрачный)
}

export default function Container({ children, className = ""}: PropsWithChildren<ContainerProps>) {
  return (
    <div
      className={`mx-auto w-full  px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
