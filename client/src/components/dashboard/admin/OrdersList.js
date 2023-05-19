import React from 'react';
import { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { FaShoppingBag } from 'react-icons/fa';
import { recentOrders, cardsData } from '@/utils/dashboard/admin/data';
import CardBasic from '@/components/dashboard/admin/CardBasic';
import BarChart from '@/components/dashboard/admin/BarChart';


function OrdersList() {
    // LÓGICA DEL COMPONENTE
    const router = useRouter();

    const handleDetails = (id) => {
        router.push(`/dashboard/admin/ventas/${id}`);
    }


    // RENDERIZADO DEL COMPONENTE
    return (
        <div className='grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-5 gap-4 p-4 '>
            {/* Tarjetas y gráfica */}
            <div className='col-span-1 2xl:col-span-2 grid grid-cols-1 2xl:grid-cols-2 gap-4 h-fit'>
                <CardBasic data={`$ ${cardsData.sumSalesToday.toLocaleString()}`} title="Ventas de Hoy" dataColor='text-verde' />
                <CardBasic data={`$ ${(2548500).toLocaleString()}`} title='Próximamente...' dataColor="text-gray-400" />
                <CardBasic data={`$ ${(37849).toLocaleString()}`} title='Próximamente...' dataColor="text-gray-400"/>
                <CardBasic data={`# ${(48577).toLocaleString()}`} title='Próximamente...' dataColor="text-gray-400"/>
                <CardBasic data={`# ${(35820).toLocaleString()}`} title='Próximamente...' dataColor="text-gray-400"/>
                <CardBasic data={`# ${(15470).toLocaleString()}`} title='Próximamente...' dataColor="text-gray-400"/>

                <BarChart colSpan='col-span-1 2xl:col-span-2' />
            </div>

            {/* Lista de ventas */}
            <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto col-span-1 xl:col-span-2 2xl:col-span-3'>
                {/* Encabezados */}
                <div className='my-3 p-2 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center justify-between '>
                    <span className='font-semibold'>Venta</span>
                    <span className='font-semibold hidden sm:grid'>Estado</span>
                    <span className='font-semibold hidden md:grid'>Hora</span>
                </div>

                {/* Registros */}
                <ul>
                    {
                        recentOrders?.map((order, index) => {
                            // Convertir la fecha a hora local
                            const utc = new Date(order.date);
                            const offset = utc.getTimezoneOffset();
                            const local = new Date(utc.getTime() + (offset*60*1000));

                            return (
                                <li key={index} 
                                className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center justify-between cursor-pointer '
                                onClick={() => handleDetails(order._id)}
                                >
                                    
                                    {/* Venta */}
                                    <div className='flex items-center'>
                                        <div 
                                            className={
                                                `p-3 rounded-lg 
                                                ${
                                                    order.orderStatus === "finalizada" 
                                                    ? 'bg-green-100' 
                                                    : 'bg-orange-100'
                                                }
                                                `
                                            }
                                        >
                                            <FaShoppingBag 
                                                className={
                                                    `${
                                                        order.orderStatus === "finalizada" 
                                                        ? 'text-verde' 
                                                        : 'text-orange-400'
                                                    }`
                                                } 
                                            
                                            />
                                        </div>
                                        <div className='pl-4'>
                                            <p className='text-gray-800 font-bold'>{`$ ${order.totalAmount}`}</p>
                                            <p className='text-gray-400 text-sm'>{order.userFirstname + " " + order.userLastname}</p>
                                        </div>
                                    </div>

                                    {/* Estado de la venta*/}
                                    <p className='text-gray-600 sm:text-left text-right hidden sm:grid'>
                                        <span
                                            className={
                                                `w-fit
                                                ${
                                                    order.orderStatus === "finalizada" 
                                                    ? 'bg-green-100 p-2 rounded-lg' 
                                                    : 'bg-orange-100 p-2 rounded-lg'
                                                }
                                                `
                                            }
                                        >
                                            {order.orderStatus}
                                        </span>
                                    </p>

                                    {/* Fecha de la venta */}
                                    <p className='text-gray-600 hidden md:grid'>{ formatDistanceToNow(local) }</p>

                                    

                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
};

export default OrdersList;