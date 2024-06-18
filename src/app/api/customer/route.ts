import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth';

import {prisma} from '@/lib/auth';

//import { PrismaClient } from '@prisma/client';

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