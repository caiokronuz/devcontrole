"use client"

import { CustomerProps } from "@/utils/customer.types"

export function CustomerCard({customer}: {customer: CustomerProps}){

    async function handleDeleteCustomer(){
        alert("funcionou paezao")
    }


    return(
        <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105">
            <h2>
                <a className="font-bold">Nome:</a> {customer.name}
            </h2>
            <p><a className="font-bold">Email: </a>{customer.email}</p>
            <p><a className="font-bold">Telefone: </a>{customer.phone}</p>

            <button 
                className="bg-red-500 px-4 rounded text-white mt-2 self-start"
                onClick={handleDeleteCustomer}
            >
                Deletar
            </button>
        </article>
    )
}