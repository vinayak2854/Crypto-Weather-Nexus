import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Link from "next/link";
import { Settings } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crypto Weather Nexus",
  description: "Track cryptocurrency prices and weather data in real-time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="text-xl font-bold text-gray-900">
                  Crypto Weather Nexus
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Settings
                </Link>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
