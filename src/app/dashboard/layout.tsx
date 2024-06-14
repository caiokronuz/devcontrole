import { ReactNode } from "react";

import {auth} from '@/lib/auth';
import {redirect} from 'next/navigation'

import { DashboardHeader } from "./components/header";


export default async function DashboardLayout({children}: {children: ReactNode}){

    const session = await auth();

    if(!session || !session.user){
        redirect("/")
    }

    return(
        <>
            <DashboardHeader />
            {children}
        </>
    )

}