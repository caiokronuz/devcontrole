"use client"
import {FiCheckSquare, FiFile} from 'react-icons/fi'
import { TicketProps } from '@/utils/ticket.types'
import { api } from '@/lib/api'
import {useRouter} from 'next/navigation'

import {useContext} from 'react'
import { ModalContext } from '@/providers/modal'

export function TicketItem({ticket}: {ticket: TicketProps}){

    const router = useRouter();
    const {handleModalVisible} = useContext(ModalContext)


    async function handleChangeStatus(){
        try{
            const response = await api.patch("/api/ticket", {
                id: ticket.id
            })
    
            router.refresh();
        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
            <tr className='border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300'>
                <td className='text-left pl-1'>{ticket.customer?.name}</td>
                <td className='text-left hidden sm:table-cell'>{ticket.created_at?.toLocaleDateString("pt-br")}</td>
                <td className='text-left'>  
                    <span className="bg-green-500 px-2 py-1 rounded">{ticket.status}</span>
                </td>
                <td className='text-left'>
                    <button className='mr-3' onClick={handleChangeStatus}>
                        <FiCheckSquare size={24} color="#131313" />
                    </button>
                    <button>
                        <FiFile onClick={handleModalVisible} size={24} color="#3B82F6" />
                    </button>
                </td>
            </tr>
        </>
    )
}