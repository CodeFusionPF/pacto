import React, { useState, useEffect } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { getAllWallets } from "../../../api/walletsApi";



function WalletsList() {
    // LÓGICA DEL COMPONENTE
    

    // Usuarios que tienen dinero en su wallet (en cualquiera de sus 2 estados)
    const [vendors, setVendors] = useState([]);
    const [totalPending, setTotalPending] = useState(0);    
    const [totalReceivable, setTotalReceivable] = useState(0);
    

    useEffect(() => {
        const fetchVendors = async () => {
            // Obtener los vendedores de la página actual
            const { totalPendingBalance, totalReceivableBalance, wallets } = await getAllWallets();
            setVendors(wallets || []);
            setTotalPending(totalPendingBalance || 0);
            setTotalReceivable(totalReceivableBalance || 0);
        };

        fetchVendors();
        console.log(vendors);
    }, []);



    // RENDERIZADO DEL COMPONENTE
    return (
        <div className='p-4'>
            <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>

                {/* Encabezados */}
                <div className='my-3 p-2 grid grid-cols-2 sm:grid-cols-4 items-center justify-between '>
                    <span className='font-semibold pl-20 hidden sm:grid sm:col-span-2'>Vendedor</span>
                    <span className='font-semibold hidden sm:grid col-span-1'>Import Pendiente</span>
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
                                    <p className='text-orange-400 grid col-span-1 font-bold'>{`$ ${vendor.pendingBalance.toLocaleString()}`}</p>

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