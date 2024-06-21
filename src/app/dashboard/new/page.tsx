import { Container } from "@/components/container";
import { prisma, auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewTicket() {

    const session = await auth();

    const customers = await prisma.customer.findMany({
        where:{
            userId: session?.user?.id,
        }
    });

    async function handleRegisterTicket(formData: FormData){
        "use server"

        const name = formData.get("name")
        const description = formData.get("description")
        const customerId = formData.get("customer")

        if(!name || !description || !customerId){
            return;
        }

        await prisma.ticket.create({
            data:{
                name: name as string,
                description: description as string,
                userId: session?.user.id as string,
                customerId: customerId as string,
                status: "Aberto"
            }
        })

        console.log("Chamado aberto com sucesso")

        redirect("/dashboard")
    }

    return (
        <Container>
        <main className="mt-9 mb-2">
            <div className="flex items-center gap-3">
            <Link
                href="/dashboard"
                className="text-white px-4 py-1 rounded bg-gray-900"
            >
                Voltar
            </Link>
            <h1 className="text-3xl font-bold">Novo chamado</h1>
            </div>

            <form className="flex flex-col mt-6" action={handleRegisterTicket}>
                <label className="mb-1 font-medium text-lg">Nome do chamado</label>
                <input
                    name="name"
                    className="w-full border-2 rounded-md px-2 mb-2 h-11"
                    type="text"
                    placeholder="Digite o nome do chamado"
                    required
                />

                <label className="mb-1 font-medium text-lg">Descreva o problema</label>
                <textarea
                    name="description"
                    className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
                    placeholder="Descreva o problema..."
                    required
                ></textarea>

            {customers.length !== 0 && (
                <>
                    <label className="mb-1 font-medium text-lg">Selecione o cliente</label>
                    <select name="customer" className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white">
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                        ))}
                    </select>
                </>
            )}

            {customers.length === 0 && (
                    <Link href="/dashboard/customer/new">
                        Você ainda não tem nenhum cliente, <span className="text-blue-500 font-medium">cadastrar cliente</span>
                    </Link>
            )}

            <button 
                type="submit"
                className="bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 disabled:bg-gray-500 disabled:cursor-not-allowed"
                disabled={customers.length === 0}
            >
                    Cadastrar
            </button>

           </form>
        </main>
        </Container>
    );
}
