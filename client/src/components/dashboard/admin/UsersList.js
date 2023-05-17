import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { BsPersonFill } from 'react-icons/bs';
import { HiKey } from 'react-icons/hi';
// Mock data
// import { users } from "../../../utils/dashboard/admin/data";
import { banUser, getAllUsers } from "../../../api/usersApi";
import Pagination from './Pagination';
import Modal from './Modal';


function UsersList() {
    // LÓGICA DEL COMPONENTE
    const router = useRouter();

    // Usuarios de la página actual de la lista
    const [users, setUsers] = useState([]);
    // Cantidad total de usuarios en la base de datos
    const [totalUsers, setTotalUsers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const amountXPage = 20; // Cantidad de usuarios por página (default: 20)
    const totalPages = Math.ceil(totalUsers / amountXPage);

    // Estado del modal
    const [modalOpen, setModalOpen] = useState(false);
    // Usuario seleccionado para bloquear/desbloquear
    const [selectedUser, setSelectedUser] = useState(null);
    

    useEffect(() => {
        const fetchUsers = async () => {
            // Obtener los usuarios de la página actual
            const { totalUsers, users } = await getAllUsers(currentPage);
            setTotalUsers(totalUsers || 0);
            setUsers(users || []);
        };

        fetchUsers();
        console.log(users);
    }, [currentPage]);


    // Función para gestionar el cambio de página
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }

    // Función para ver detalles del usuario
    const handleDetails = (id) => {
        router.push(`/dashboard/admin/usuarios/${id}`);
    }

    // Función para abrir el modal y pedir confirmaciòn para bloquear/desbloquear usuario
    const handleBlock = async (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    }

    // Función para bloquear/desbloquear usuario
    const handleConfirmBlock = async () => {
        try {
            const response = await banUser(selectedUser);
            router.reload();
        } catch (error) {
            console.error('Error al bloquear usuario:', error);
            alert('Error al bloquear usuario');
        }

        setModalOpen(false);
    }



    // RENDERIZADO DEL COMPONENTE
    return (
        <div className='p-4'>
            <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>

                {/* Encabezados */}
                <div className='my-3 p-2 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 items-center justify-between '>
                    <span className='font-semibold pl-20 hidden sm:grid sm:col-span-2 md:col-span-2 xl:col-span-2'>Nombre</span>
                    <span className='font-semibold hidden sm:grid col-span-1'>Verificación</span>
                    <span className='font-semibold hidden sm:grid col-span-1'>Estado</span>
                    <span className='font-semibold hidden xl:grid col-span-2'>Email</span>
                    <span className='font-semibold hidden lg:grid col-span-2 xl:col-span-1'>Registrado/a</span>
                    <span className='font-semibold hidden md:grid col-span-1'>Acciones</span>
                </div>

                {/* Registros */}
                <ul>
                    {
                        users?.map((user, index) => {
                            // Convertir la fecha a hora local
                            let local = null;
                            if (user.registrationdate) {
                                const utc = new Date(user.registrationdate);
                                const offset = utc.getTimezoneOffset();
                                local = new Date(utc.getTime() + (offset*60*1000));
                            }

                            return (
                                <li key={index} 
                                className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-4 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 items-center justify-between '
                                >
                                    
                                    {/* Nombre */}
                                    <div className='flex items-center justify-center sm:justify-start flex-col sm:flex-row col-span-1 sm:col-span-2 md:col-span-2 xl:col-span-2 ' >
                                        <div 
                                        className={
                                            `p-3 rounded-full sm:rounded-lg mb-2 sm:mb-0
                                            ${
                                                user.state === "activo" ? 'bg-green-100' 
                                                : user.state === "bloqueado" ? 'bg-red-100'
                                                : 'bg-gray-100'
                                            }`
                                        }
                                        >
                                            {/* Renderizado condicional de ícono según rol y estado */}
                                            {
                                                user.role?.role === 'admin' ? 
                                                    <HiKey size={20} 
                                                    title='Administrador'
                                                    className={`
                                                        text-4xl
                                                        ${ user.state === "activo" ? 'text-verde' 
                                                        : user.state === "bloqueado" ? 'text-red-400'
                                                        : 'text-gray-400'}`
                                                    } 
                                                    />
                                                :   <BsPersonFill size={20} 
                                                    title='Usuario'
                                                    className={`
                                                        text-4xl
                                                        ${ user.state === "activo" ? 'text-verde' 
                                                        : user.state === "bloqueado" ? 'text-red-400'
                                                        : 'text-gray-400'}`
                                                    } 
                                                    />
                                            }
                                        </div>
                                        <p className='font-medium text-center sm:pl-4'>{user.firstname + " " + user.lastname}</p>
                                    </div>

                                    {/* Verificado */}
                                    <p 
                                    className="grid col-span-1 rounded-lg justify-center sm:justify-start items-center "> 
                                        <span className={`
                                        text-sm font-semibold w-fit py-1
                                        ${
                                            user.verified ? 'text-verde' 
                                            : 'text-orange-400'
                                        }
                                        `}
                                        >
                                            {user.verified ? '✔ Verificado' : '⨯ Pendiente'}
                                        </span>
                                    </p>

                                    {/* Estado */}
                                    <p 
                                    className="grid col-span-1 rounded-lg justify-center sm:justify-start items-center">
                                        <span className={`
                                        text-sm font-semibold w-fit py-1
                                        ${
                                            user.state === "activo" ? 'text-verde' 
                                            : user.state === "bloqueado" ? 'text-red-500'
                                            : 'text-gray-400'
                                        }
                                        `}
                                        >
                                            {user.state === "activo" ? "✔ Activo" 
                                            : user.state === "bloqueado" ? "⨯ Bloqueado"
                                            : "⨯ Desactivado"}
                                        </span>
                                    </p>

                                    {/* Email */}
                                    <p className='text-gray-600 hidden xl:grid col-span-2'>{user.email}</p>

                                    {/* Fecha de registro */}
                                    <p className='text-gray-600 hidden lg:grid col-span-2 xl:col-span-1'>{ 
                                    local ? formatDistanceToNow(local) : "próximamente..." }</p>

                                    {/* Acciones */}
                                    <div className='flex items-center justify-center col-span-1 sm:col-span-4 md:col-span-1 mt-2'>
                                        <button 
                                        className='
                                            bg-gray-100 hover:bg-verde text-verde-dark hover:text-white 
                                            rounded-md border-2 border-verde
                                            font-semibold text-sm
                                            w-24 sm:max-w-md py-1 px-2 mx-1 
                                            shadow-sm cursor-pointer'
                                        onClick={() => handleDetails(user._id)}
                                        >
                                            Perfil
                                        </button>
                                        <button 
                                        className='
                                            bg-gray-100 hover:bg-rose-500 text-rose-600 hover:text-white font-semibold text-sm 
                                            rounded-md border-2 border-rose-400 hover:border-rose-500 
                                            w-24 sm:max-w-md py-1 px-2 mx-1
                                            shadow-sm cursor-pointer
                                            disabled:text-gray-400 disabled:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed '
                                        onClick={() => handleBlock(user)}
                                        // No se puede bloquear o activar a un usuario desactivado
                                        disabled={user.state === "desactivado"}
                                        >
                                            {user.state === "activo" || user.state === "desactivado" ? "Bloquear" : "Desbloquear"}
                                        </button>
                                    </div>
                                    {
                                        modalOpen && (
                                            <Modal
                                            onConfirm={handleConfirmBlock}
                                            onClose={() => setModalOpen(false)}
                                            message={`¿Estás seguro de que quieres ${selectedUser.state ? 'BLOQUEAR' : 'ACTIVAR'} al usuario ${selectedUser.firstname} ${selectedUser.lastname}?`}
                                            />
                                        )
                                    }

                                </li>
                            )
                        })
                    }
                </ul>

                {/* Paginación */}
                {/* TO-DO: testear cuando haya más de 20 usuarios en la base */}
                <div className='flex w-full items-center justify-center p-4'>
                    <Pagination currentPage={users.length !== 0 ? currentPage : 0} totalPages={totalPages} handlePageChange={handlePageChange} />
                </div>
            </div>
        </div>
    )
}

export default UsersList;