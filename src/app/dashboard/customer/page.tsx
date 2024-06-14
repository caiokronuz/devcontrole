import Link from "next/link"

import { CustomerCard } from "./components/card"

import { Container } from "@/components/container"

export default function Customer(){
    return(
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Meus clientes</h1>
                    <Link href="/dashboard/customer/new" className="bg-blue-500 text-white px-4 py-1 rounded">
                       Novo cliente 
                    </Link>
                </div>
                
                <section>
                    <CustomerCard />
                    <CustomerCard />
                    <CustomerCard />
                </section>

            </main>
        </Container>
    )
}