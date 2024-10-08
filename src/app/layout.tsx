import type { Metadata } from "next";
import "@/styles/globals.css";
import { EdgeStoreProvider } from "../lib/edgestore";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Created by jmftan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="lg:overflow-hidden">
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </body>
    </html>
  );
}
