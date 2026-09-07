import { Providers } from "./providers";
import "./globals.css";

export const metadata = {
  title: "Enciclopedia Web Moderna (Next.js 16)",
  description: "Mapa mental tridimensional en 8 capas del desarrollo web moderno con Next.js 16, React 19 y MongoDB.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}