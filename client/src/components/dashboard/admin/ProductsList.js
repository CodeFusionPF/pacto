import React, {useState, useEffect} from 'react';
import { getProductsByPage } from '../../../api/productsApi';
import { BsPostcard } from 'react-icons/bs';


function ProductsList() {
    // LÓGICA DEL COMPONENTE
    const [products, setProducts] = useState([]);
    const [amountXPage, setAmountXPage] = useState(24); // Cantidad de productos por página (default: 24)
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            // Obtener los productos de la página actual
            const { totalProducts, amountXPage, products} = await getProductsByPage(page);
            setTotalProducts(totalProducts);
            setAmountXPage(amountXPage);
            setProducts(products);

            // Cálculo de la cantidad de páginas
            const pages = Math.ceil(totalProducts / amountXPage);
            setTotalPages(pages);

            // Si la página actual es mayor a la cantidad de páginas, se setea la última página
            if (page > pages) {
                setPage(pages);
            }
        };

        fetchProducts();
    }, [page]);


    const handleDetails = (id) => {
        // TO-DO: Mostrar detalles del usuario
        console.log(id);
    }



    // RENDERIZADO DEL COMPONENTE
    return (
        <div className='p-4'>
            <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>

                {/* Encabezados */}
                <div className='my-3 p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-1 items-center justify-between '>
                    <span className='font-semibold col-span-2'>Nombre</span>
                    <span className='font-semibold hidden md:grid'>Estado</span>
                    <span className='font-semibold hidden lg:grid'>Categoría</span>
                    <span className='font-semibold hidden xl:grid'>SubCategoría</span>
                    <span className='font-semibold hidden sm:grid'>Precio</span>
                </div>

                {/* Registros */}
                <ul>
                    {
                        products?.map((product, index) => {
                            
                            return (
                                <li key={index} 
                                className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-1 items-center justify-between cursor-pointer '
                                onClick={() => handleDetails(product._id)}
                                >
                                    
                                    {/* Nombre */}
                                    <div className='flex items-center col-span-2'>
                                        <div className='bg-green-100 p-3 rounded-lg '>
                                            <BsPostcard className='text-verde-dark' />
                                        </div>
                                        <p className='font-medium pl-4'>{product.name}</p>
                                    </div>

                                    {/* Estado */}
                                    <p className='text-gray-600 hidden md:grid '>{product.state}</p>

                                    {/* Categoría */}
                                    <p className='text-gray-600 hidden lg:grid'>{product.category}</p>

                                    {/* SubCategoría */}
                                    <p className='text-gray-600 hidden xl:grid'>{product.subcategory}</p>

                                    {/* Precio */}
                                    <p className='text-gray-600 hidden sm:grid'>{product.price}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
};

export default ProductsList;