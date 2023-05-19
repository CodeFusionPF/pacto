import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getProductsToAdminByPage } from '../../../api/productsApi';
import { banProduct } from '../../../api/productsApi';
import Pagination from './Pagination';
import Modal from './Modal';


function ProductsList() {
    // LÓGICA DEL COMPONENTE
    const router = useRouter();

    // Productos de la página actual de la lista
    const [products, setProducts] = useState([]);
    // Cantidad total de productos en la base de datos
    const [totalProducts, setTotalProducts] = useState(0);
    const [amountXPage, setAmountXPage] = useState(24); // Cantidad de productos por página (default: 24)
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalProducts / amountXPage);

    // Estado del modal
    const [modalOpen, setModalOpen] = useState(false);
    // Producto seleccionado para bloquear/desbloquear
    const [selectedProd, setSelectedProd] = useState(null);


    useEffect(() => {
        const fetchProducts = async () => {
            // Obtener los productos de la página actual
            const { totalProducts, amountXPage, products} = await getProductsToAdminByPage(currentPage);
            setAmountXPage(amountXPage || 24);
            setProducts(products || []);
            setTotalProducts(totalProducts || 0);
        };

        fetchProducts();
    }, [currentPage]);


    // Función para gestionar el cambio de página
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }

    // Función para ver los detalles de un producto
    const handleDetails = (id) => {
        router.push(`/dashboard/admin/productos/${id}`);
    }

    // Función para abrir el modal y pedir confirmaciòn para bloquear/desbloquear producto
    const handleBlock = async (product) => {
        setSelectedProd(product);
        setModalOpen(true);
    }

    // Función para bloquear/desbloquear producto

    const handleConfirmBlock = async () => {
        try {
            const response = await banProduct(selectedProd);
            router.reload();
        } catch (error) {
            console.error('Error al bloquear producto:', error);
            alert('Error al bloquear producto');
        }

        setModalOpen(false);
    }



    // RENDERIZADO DEL COMPONENTE
    return (
        <div className='p-4'>
            <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>

                {/* Encabezados */}
                <div className='my-3 p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-x-1 items-center justify-between '>
                    <span className='font-semibold hidden sm:grid sm:col-span-2 pl-24'>Nombre</span>
                    <span className='font-semibold hidden md:grid'>Estado</span>
                    <span className='font-semibold hidden lg:grid'>Categoría</span>
                    <span className='font-semibold hidden xl:grid'>SubCategoría</span>
                    <span className='font-semibold hidden md:grid col-span-1'>Acciones</span>
                </div>

                {/* Registros */}
                <ul>
                    {
                        products?.map((product, index) => {
                            
                            return (
                                <li key={index} 
                                className={`rounded-lg my-3 px-2 py-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-x-2 items-center justify-between 
                                ${product.active === "bloqueado" ? "bg-red-100 hover:bg-red-50" : "bg-gray-100 hover:bg-gray-50"}
                                `}
                                >
                                    
                                    {/* Nombre */}
                                    <div className='flex flex-col sm:flex-row items-center col-span-2 p-2 text-center sm:text-left relative'>
                                        <div className='flex justify-center content-stretch items-stretch w-28 h-28 sm:w-16 sm:h-16 mb-2'>
                                            {/* Rectángulo con el stock */}
                                            <div className={`absolute -top-2 -left-4 z-10 w-8 h-8 text-white font-semibold text-center flex items-center justify-center rounded-md opacity-75
                                            ${
                                                product.stock === 0 ? "bg-gray-400" : "bg-verde"
                                            }
                                            `}>
                                                <span className="text-xs">{product.stock}</span>
                                            </div>
                                            
                                            {/* Imagen */}
                                            <div className='flex justify-center content-stretch items-stretch w-28 h-28 sm:w-16 sm:h-16 overflow-hidden rounded-md drop-shadow-md mb-2'>
                                                <Image src={product.images[0]} alt={product.name} width="50" height="50" className='w-full h-full object-cover flex-1'/>
                                            </div>

                                        </div>
                                        <p className='font-medium pl-0 sm:pl-4 text-center'>{product.name}</p>
                                    </div>

                                    {/* Estado */}
                                    <p className='text-gray-600 hidden md:grid '>{product.state}</p>

                                    {/* Categoría */}
                                    <p className='text-gray-600 hidden lg:grid'>{product.category}</p>

                                    {/* SubCategoría */}
                                    <p className='text-gray-600 hidden xl:grid'>{product.subcategory}</p>

                                    {/* Precio */}
                                    <p className='text-gray-600 hidden sm:grid'>{`$ ${product.price.toLocaleString()}`}</p>

                                    {/* Acciones */}
                                    <div className='flex items-center md:items-start justify-center col-span-1 sm:col-span-4 md:col-span-1 mt-2'>
                                        <button 
                                        className='
                                            bg-gray-100 hover:bg-verde text-verde-dark hover:text-white 
                                            rounded-md border-2 border-verde
                                            font-semibold text-sm
                                            w-24 sm:max-w-md py-1 px-2 mx-1 
                                            shadow-sm cursor-pointer'
                                        onClick={() => handleDetails(product._id)}
                                        >
                                            Detalle
                                        </button>
                                        <button 
                                        className='
                                            bg-gray-100 hover:bg-rose-500 text-rose-600 hover:text-white font-semibold text-sm 
                                            rounded-md border-2 border-rose-400 hover:border-rose-500 
                                            w-24 sm:max-w-md py-1 px-2 mx-1
                                            shadow-sm cursor-pointer'
                                        onClick={() => handleBlock(product)}
                                        >
                                            {product.active === "bloqueado" ? "Desbloquear" : "Bloquear"}
                                        </button>
                                    </div>
                                    {
                                        modalOpen && (
                                            <Modal
                                            onConfirm={handleConfirmBlock}
                                            onClose={() => setModalOpen(false)}
                                            message={`¿Estás seguro de que quieres ${selectedProd.active === "bloqueado" ? "DESBLOQUEAR" : "BLOQUEAR"} el producto ${selectedProd.name}?`}
                                            />
                                        )
                                    }

                                </li>
                            )
                        })
                    }
                </ul>

                {/* Paginación */}
                <div className='flex w-full items-center justify-center p-4'>
                    <Pagination currentPage={products.length !== 0 ? currentPage : 0} totalPages={totalPages} handlePageChange={handlePageChange} />
                </div>
            </div>
        </div>
    )
};

export default ProductsList;