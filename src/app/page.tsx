import Image from "next/image";
import {redirect} from 'next/navigation'
import Link from "next/link";

import { auth } from "@/lib/auth";

import heroImg from '@/assets/hero.svg';

export default async function Home() {

  const session = await auth();

  if(session?.user){
    redirect("/dashboard")
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)]">
      <h2 className="font-medium text-2xl mb-2">Gerencie sua empresa</h2>
      <h1 className="font-bold text-3xl text-blue-600 mb-8 md:text-4xl">Atendimentos, clientes</h1>
      <Image
        src={heroImg}
        alt="Imagem hero dev controle"
        width={600}
        className="max-w-sm md:max-w-xl"
      />
      <Link href="/open" className="bg-blue-600 p-2 rounded text-white mt-8 hover:scale-105 transition">Sou cliente e quero abrir um chamado</Link>
    </main>
  );
}
