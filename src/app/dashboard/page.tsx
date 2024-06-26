import Link from "next/link"

import { Container } from "@/components/container"
import { TicketItem } from "./components/ticket"
import { auth, prisma } from "@/lib/auth";

import { ButtonRefresh } from "./components/button";

export default async function Dashboard() {

    const session = await auth();

    const tickets = await prisma.ticket.findMany({
        where: {
            status: "Aberto",
            customer: {
                userId: session?.user.id,
            }
        },
        include: {
            customer: true,
        },
        orderBy: {
            created_at: "asc"
        }
    })

    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Chamados</h1>
                    <div className="flex items-center justify-center gap-3">
                        <ButtonRefresh />

                        <Link href="/dashboard/new" className="bg-blue-500 px-4 py-1 rounded text-white">
                            Abrir chamado
                        </Link>
                    </div>
                </div>

                <table className="min-w-full my-2">
                    <thead>
                        <tr>
                            <th className="font-medium text-left pl-1">CLIENTE</th>
                            <th className="font-medium text-left hidden sm:block">DATO CADASTRO</th>
                            <th className="font-medium text-left">STATUS</th>
                            <th className="font-medium text-left">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <TicketItem customer={ticket.customer} ticket={ticket} key={ticket.id} />
                        ))}
                    </tbody>
                </table>
                {tickets.length === 0 && (
                    <h1 className="px-2 md:px-0 text-gray-600">Nenhum ticket aberto foi encontrado...</h1>
                )}
            </main>
        </Container>
    )
}