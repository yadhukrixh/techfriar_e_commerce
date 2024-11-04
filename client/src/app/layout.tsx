"use client";
import Footer from "@/modules/common/footer";
import "./globals.css";
import NavBar from "@/modules/common/nav-bar/nav-bar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        {!pathname.startsWith("/login") && <NavBar />}
        {children}
        {!pathname.startsWith("/login") && <Footer />}
      </body>
    </html>
  );
}
