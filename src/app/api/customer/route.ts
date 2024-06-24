import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth';

import {prisma} from '@/lib/auth';

export async function GET(request: Request){
    const {searchParams} = new URL(request.url)
    const customerEmail = searchParams.get("email")

    if(!customerEmail || customerEmail === ""){
        return NextResponse.json({error: "Customer not found"}, {status:400})
    }

    try{
        const customer = await prisma.customer.findFirst({
            where:{
                email: customerEmail,
            }
        })

        return NextResponse.json(customer)
    }catch(err){
        return NextResponse.json({error: "Customer not found"}, {status:400})
    }

}

export async function DELETE(request: Request){

    const session = await auth();

    if(!session || !session.user){
        return NextResponse.json({error: "Usuário não reconhecido/autenticado"}, {status: 401})
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    if(!userId){
        return NextResponse.json({error: "Failed delete customer"}, {status:400})
    }

    const findTickets = await prisma.ticket.findFirst({ //Verifica se o cliente possui tickets em aberto
        where: {
            customerId: userId,
        }
    })

    if(findTickets){
        return NextResponse.json({error: "Failed delete client"}, {status: 400})
    }
  
    try{
        await prisma.customer.delete({
            where:{
                id: userId as string,
            }
        })

        return NextResponse.json({message: "Client deleted successfully"})
    }catch(err){
        console.log(err);
        return NextResponse.json({error: "Failed delete customer"}, {status:400})
    }


}

export async function POST(request: Request){

    const session = await auth();
    //const prisma = new PrismaClient();

    if(!session || !session.user){
        return NextResponse.json({error: "Usuário não reconhecido/autenticado"}, {status: 401})
    }


    const {name, email, phone, address} = await request.json();

    try{
        await prisma.customer.create({
            data:{
                name,
                phone,
                email,
                address: address ? address : "",
                userId: session.user.id,
            }
        })

        return NextResponse.json({message: "Cliente cadastrado com sucesso!"})
    }catch(err){
        return NextResponse.json({error: "Falha ao criar novo cliente"}, {status: 400})
    }
}