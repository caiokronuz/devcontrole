import { NextResponse } from "next/server";

import {auth, prisma} from '@/lib/auth'


export async function PATCH(request: Request){
    const session = await auth();

    if(!session || !session.user){
        return NextResponse.json({error: "Not Authorized"}, {status: 401})
    }

    const {id} = await request.json();

    const findTicket = await prisma.ticket.findFirst({
        where: {
            id: id as string,
        }
    })

    if(!findTicket){
        return NextResponse.json({error: "Failed update ticket"}, {status:400})
    }

    try{
        await prisma.ticket.update({
            where:{
                id: id as string
            },
            data:{
                status: "Fechado",
            }
        })

        return NextResponse.json({message: "Chamado atualizado com sucesso!"})
    }catch(err){
        return NextResponse.json({error: "Failed update ticket"}, {status:400})
    }
}