import React, { useState, useEffect } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { getAllWallets } from "../../../api/walletsApi";
import CardBasic from '@/components/dashboard/admin/CardBasic';
import BarChartWallets from '@/components/dashboard/admin/BarChartWallets';



function WalletsList() {
    // LÓGICA DEL COMPONENTE
    

    // Usuarios que tienen dinero en su wallet (en cualquiera de sus 2 estados)
    const [vendors, setVendors] = useState([]);
    const [totalPending, setTotalPending] = useState(0);    
    const [totalReceivable, setTotalReceivable] = useState(0);
    const [barChartData, setBarChartData] = useState([
        {
            label: "A liberar",
            total: 0,
        },
        {
            label: "Pendiente",
            total: 0,
        }
    ]); 
    

    useEffect(() => {
        const fetchVendors = async () => {
            // Obtener los vendedores de la página actual
            const { totalPendingBalance, totalReceivableBalance, wallets } = await getAllWallets();
            setVendors(wallets || []);
            setTotalPending(totalPendingBalance || 0);
            setTotalReceivable(totalReceivableBalance || 0);
            setBarChartData([
                {
                    label: "A liberar",
                    total: totalReceivableBalance || 0,
                },
                {
                    label: "Pendiente",
                    total: totalPendingBalance || 0,
                }
            ]);
        };

        fetchVendors();
    }, []);



    // RENDERIZADO DEL COMPONENTE
    return (
        <div className='grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-5 gap-4 p-4 '>

            {/* Tarjetas y gráfica */}
            <div className='col-span-1 2xl:col-span-2 grid grid-cols-1 2xl:grid-cols-2 gap-4 h-fit'>
                <CardBasic data={`$ ${totalReceivable.toLocaleString()}`} title="Total a Liberar" dataColor='text-verde' />
                <CardBasic data={`$ ${totalPending.toLocaleString()}`} title='Total Pendiente' />
                <CardBasic data={`$ ${(37849).toLocaleString()}`} title='Próximamente...' dataColor="text-gray-400" />
                <CardBasic data={`# ${(48577).toLocaleString()}`} title='Próximamente...' dataColor="text-gray-400" />
                <CardBasic data={`# ${(35820).toLocaleString()}`} title='Próximamente...' dataColor="text-gray-400" />
                <CardBasic data={`# ${(15470).toLocaleString()}`} title='Próximamente...' dataColor="text-gray-400" />

                <BarChartWallets colSpan='col-span-1 2xl:col-span-2' barChartData={barChartData} />
            </div>

            {/* Lista de Wallets con saldo distinto a 0 */}
            <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto col-span-1 xl:col-span-2 2xl:col-span-3 min-h-full'>
                {/* Encabezados */}
                <div className='my-3 p-2 grid grid-cols-2 sm:grid-cols-4 items-center justify-between '>
                    <span className='font-semibold pl-20 hidden sm:grid sm:col-span-2'>Vendedor</span>
                    <span className='font-semibold hidden sm:grid col-span-1'>Importe Pendiente</span>
                    <span className='font-semibold hidden sm:grid col-span-1'>Importe a Liberar</span>
                </div>

                {/* Registros */}
                <ul>
                    {
                        vendors?.map((vendor, index) => {
                            
                            return (
                                <>
                                {/* Si existe vendor.user... */}
                                { 
                                    vendor.user &&

                                <li key={index} 
                                className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-4 grid grid-cols-2 sm:grid-cols-4 items-center justify-between '
                                >
                                    
                                    {/* Nombre */}
                                    <div className='flex items-center justify-center sm:justify-start flex-col sm:flex-row col-span-2 '>
                                        <div className="p-3 rounded-full sm:rounded-lg mb-2 sm:mb-0 bg-green-100">
                                        <BsPersonFill size={20} 
                                                    title='Vendedor'
                                                    className="text-4xl text-verde"/>
                                        </div>
                                        <p className='font-medium text-center sm:pl-4'>{vendor.user.firstname + " " + vendor.user.lastname}</p>
                                    </div>

                                    {/* Pendiente */}
                                    <p className='grid col-span-1 text-lila'>{`$ ${vendor.pendingBalance.toLocaleString()}`}</p>

                                    {/* A liberar */}
                                    <p className='text-verde grid col-span-1 font-bold'>{`$ ${vendor.receivableBalance.toLocaleString()}`}</p>  

                                </li>
                            }
                                </>
                            )
                        })
                    }
                </ul>

            </div>
        </div>
    )
}

export default WalletsList;