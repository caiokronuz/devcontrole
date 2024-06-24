import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header } from "@/components/header";
import {AuthProvider} from "@/providers/auth";
import {ModalProvider} from "@/providers/modal"

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Controle - Seu sistema de gerenciamento.",
  description: "Gerencie seus clientes e atendimentos de forma fácil.",
};

interface LayoutProps{
  children: React.ReactNode;
  types: string;
}

export default function RootLayout({
  children,
  types
}: Readonly<LayoutProps>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <ModalProvider>
            <Header />
            {children}
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
