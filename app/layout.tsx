import type { ReactNode } from "react";
import "./globals.css"
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}