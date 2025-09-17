import type { Metadata } from "next";
import { Geist, Geist_Mono, Be_Vietnam_Pro} from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { AppProvider } from "./contexts/AppContext";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // choose the weights you need
  display: "swap",
});

export const metadata: Metadata = {
  title: "World Ranks",
  description: "Country Ranks App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${beVietnamPro.className} antialiased bg-[#1c1d1f] min-h-screen w-full`}
      >
        <main className="h-full bg-[#1c1d1f] pb-32">
          <div className="w-full h-80 relative bg-[#1c1d1f]">
            <picture>
              <Image
                src={"/hero-image.jpg"}
                alt="background"
                fill
                className="relative"
              ></Image>
              <Image
                src={"/Logo.svg"}
                alt="Logo"
                width={300}
                height={200}
                className="absolute top-1/2 left-1/2 -translate-1/2"
              ></Image>
            </picture>
          </div>
          <div className="px-8 py-12 border-1 border-gray-800 bg-[#1c1d1f] w-9/10  mx-auto relative -top-10 h-fit min-h-400  overscroll-contain rounded-2xl">
            <div>
              <AppProvider>{children}</AppProvider>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
