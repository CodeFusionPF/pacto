import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";
import { HiOutlineShoppingBag, HiOutlineChatAlt2, HiOutlineUser, HiOutlineChartBar } from 'react-icons/hi';
import { BsPostcard } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import { MdOutlineRateReview } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

const Sidebar = () => {
  // LÓGICA DEL COMPONENTE
  const router = useRouter();



  // RENDERIZADO DEL COMPONENTE
  return (
    <div className='flex'>
      {/* Contenedor */}
      <div className='w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col '>
        {/* Main */}
        <div className='flex flex-col items-center'>
          
          {/* Logo (dirige al home) */}
          <Link href="/">
            <div className='cursor-pointer inline-block'>
              <Image src="/pacto-logo.png" alt="logo" width="85" height="88" title='Home' className='max-w-fit px-3'/> 
            </div>
          </Link>

          <span className='border-b-[1px] border-gray-200 w-full p-2'></span>

          {/* Botón Dashboard */}
          <Link href="/dashboard/admin">
            <div 
              className={`bg-gray-100 text-verde-dark hover:bg-verde hover:text-white active:bg-verde active:text-white cursor-pointer p-3 mt-4 mb-2 rounded-lg inline-block 
              ${router.pathname === "/dashboard/admin" ? "bg-verde text-white" : "bg-gray-100 text-verde-dark"}
              `} 
              title='Dashboard'>
                <HiOutlineChartBar size={20} />
            </div>
          </Link>

          {/* Botón Ventas */}
          <Link href="/dashboard/admin/ventas">
            <div 
              className={`bg-gray-100 text-verde-dark hover:bg-verde hover:text-white active:bg-verde active:text-white cursor-pointer p-3 mt-4 mb-2 rounded-lg inline-block 
              ${router.pathname === "/dashboard/admin/ventas" ? "bg-verde text-white" : "bg-gray-100 text-verde-dark"}
              `}
              title='Últimas ventas realizadas'>
                <HiOutlineShoppingBag size={20} />
            </div>
          </Link>

          {/* Botón Productos */}
          <Link href="/dashboard/admin/productos">
            <div 
              className={`bg-gray-100 text-verde-dark hover:bg-verde hover:text-white active:bg-verde active:text-white cursor-pointer p-3 mt-4 mb-2 rounded-lg inline-block 
              ${router.pathname === "/dashboard/admin/productos" ? "bg-verde text-white" : "bg-gray-100 text-verde-dark"}
              `}
              title='Últimos productos publicados'>
                <BsPostcard size={20} />
            </div>
          </Link>

          {/* Botón Usuarios */}
          <Link href="/dashboard/admin/usuarios">
            <div 
              className={`bg-gray-100 text-verde-dark hover:bg-verde hover:text-white active:bg-verde active:text-white cursor-pointer p-3 mt-4 mb-2 rounded-lg inline-block 
              ${router.pathname === "/dashboard/admin/usuarios" ? "bg-verde text-white" : "bg-gray-100 text-verde-dark"}
              `}
              title='Últimos usuarios registrados'>
                <HiOutlineUser size={20} />
            </div>
          </Link>

          {/* Botón Billeteras */}
          <Link href="/dashboard/admin/billeteras">
            <div 
              className={`bg-gray-100 text-verde-dark hover:bg-verde hover:text-white active:bg-verde active:text-white cursor-pointer p-3 mt-4 mb-2 rounded-lg inline-block 
              ${router.pathname === "/dashboard/admin/billeteras" ? "bg-verde text-white" : "bg-gray-100 text-verde-dark"}
              `}
              title='Billeteras de vendedores'>
                <RiMoneyDollarCircleLine size={20} />
            </div>
          </Link>

          {/* Botón Reviews */}
          <Link href="/dashboard/admin/calificaciones">
            <div 
              className={`bg-gray-100 text-verde-dark hover:bg-verde hover:text-white active:bg-verde active:text-white cursor-pointer p-3 mt-4 mb-2 rounded-lg inline-block 
              ${router.pathname === "/dashboard/admin/calificaciones" ? "bg-verde text-white" : "bg-gray-100 text-verde-dark"}
              `}
              title='Últimas calificaciones realizadas'>
                <MdOutlineRateReview size={20} />
            </div>
          </Link>

          {/* Botón Preguntas/Respuestas */}
          <Link href="/dashboard/admin/preguntas">
            <div 
              className={`bg-gray-100 text-verde-dark hover:bg-verde hover:text-white active:bg-verde active:text-white cursor-pointer p-3 mt-4 mb-2 rounded-lg inline-block 
              ${router.pathname === "/dashboard/admin/preguntas" ? "bg-verde text-white" : "bg-gray-100 text-verde-dark"}
              `}
              title='Últimas preguntas/respuestas'>
                <HiOutlineChatAlt2 size={20} />
            </div>
          </Link>

          {/* Botón Configuración */}
          <Link href="/dashboard/admin/configuracion">
            <div 
              className={`bg-gray-100 text-verde-dark hover:bg-verde hover:text-white active:bg-verde active:text-white cursor-pointer p-3 mt-4 mb-2 rounded-lg inline-block 
              ${router.pathname === "/dashboard/admin/configuracion" ? "bg-verde text-white" : "bg-gray-100 text-verde-dark"}
              `}
              title='Configuración'>
                <FiSettings size={20} />
            </div>
          </Link>

        </div> 
      </div>
    </div>
  )
};

export default Sidebar;