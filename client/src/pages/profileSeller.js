import React, { useEffect, useState } from "react";
import style from "@/styles/profileSeller.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import Head from "next/head";
import { useRouter } from "next/router";
import { BsEmojiFrown, BsEmojiNeutral, BsEmojiSmile } from 'react-icons/bs';
import { getVendorReviews, getVendorRatings } from "../api/reviewsApi";


function profileSeller() {

    const navigate = useRouter();

    // Traemos la información del vendedor desde el estado global
    const { productSeller } = useSelector(state => state.products);
    
    // Reviews de la página actual de la lista
    const [reviews, setReviews ] = useState([]);
    // Calificaciones del vendedor
    const [ratings, setRatings] = useState(
        {
            goodcalification: 0,
            neutralcalification: 0,
            badcalification: 0
        }
    );

    // Cantidad total de reviews del vendedor en la base de datos
    const [totalReviews, setTotalReviews] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const amountXPage = 10; // Cantidad de usuarios por página (default: 10)
    const totalPages = Math.ceil(totalReviews / amountXPage);


    useEffect(() => {
        if (!productSeller){
            navigate.push('/productos');
        }

        // Función para obtener las reviews del vendedor
        const fetchReviews = async () => {
            // Obtener las reviews de la página actual
            const { totalReviews, reviews } = await getVendorReviews(productSeller._id, currentPage);
            console.log(reviews);
            setReviews(reviews);
            setTotalReviews(totalReviews || 0);
        };

        //Función para obtener las calificaciones del vendedor
        const fetchRatings = async () => {
            const ratings = await getVendorRatings(productSeller._id);
            setRatings(ratings);
            console.log(ratings);
        };

        fetchReviews();
        fetchRatings();

    }, [productSeller, currentPage ]);


    // Función para gestionar el cambio de página
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };



  return (
    <>
      <Head>
        <title>H2H | Perfil</title>
        <meta name="description" content="H2H" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/pacto-logo.png" />
      </Head>
    
      {
        productSeller && 
        <div className={style.containerProfile}>
        <Link href="/">
            <Image className= {style.imageDetail} priority src="/pacto-logo.png" alt="logo" width="140" height="140"/>
        </Link>
            <h2 className={style.profileTitle}>Información vendedor</h2>
            
            <div className={style.containerProfileData}>
                <div className="flex flex-col items-start justify-center bg-white rounded-lg p-4 sm:p-8 md:p-12 lg:p-20 mt-2 sm:mt-4 md:mt-6 lg:mt-12">
                    <h3 className="text-2xl font-bold mb-2 text-gray-400">
                        Información personal
                    </h3>
                    <p className="text-md py-1">
                        <span className="font-bold text-gray-600">Nombre:</span> {productSeller?.firstname + " " + productSeller?.lastname}
                    </p>
                    <p className="text-md py-1">
                        <span className="font-bold text-gray-600">Ubicación:</span> {`${productSeller?.city?.city}, ${productSeller?.department?.department}`}
                    </p>
                </div>

                <div className={style.containerProfileData2}>
                    <div className="flex flex-col items-start justify-center bg-white rounded-lg p-4 sm:p-8 md:p-12 lg:p-20 mt-2 sm:mt-4 md:mt-6 lg:mt-12"> 
                        <h2 className="text-2xl font-bold mb-2 text-gray-400">Calificaciones</h2>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-bold">
                                Calificaciones positivas
                            </h4>
                            <div className="flex items-center">
                                <BsEmojiSmile className="text-green-500 text-2xl" />
                                <p className="text-sm text-gray-500 ml-2">
                                    {ratings.goodcalification}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-bold">
                                Calificaciones neutrales
                            </h4>
                            <div className="flex items-center">
                                <BsEmojiNeutral className="text-gray-600 text-2xl" />
                                <p className="text-sm text-gray-500 ml-2">
                                    {ratings.neutralcalification}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-bold">
                                Calificaciones negativas
                            </h4>
                            <div className="flex items-center">
                                <BsEmojiFrown className="text-red-500 text-2xl" />
                                <p className="text-sm text-gray-500 ml-2">
                                    {ratings.badcalification}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* card opiniones que le han dado al vendedor */}
                <div className={style.containerProfileData2}>
                <div className="flex flex-col items-start justify-center bg-white rounded-lg p-4 sm:p-8 md:p-12 lg:p-20 mt-2 sm:mt-4 md:mt-6 lg:mt-12">
                    <h2 className="text-2xl font-bold mb-2 text-gray-400">Opiniones de sus compradores</h2>
                    {
                        !reviews?.length
                        ?
                        <div className={style.notReview}>
                            <h4>Este comprador aun no tiene reviews recibidas</h4>
                            <Image src='/image/triste.png'  width={50} height={50} alt=""/>
                        </div>
                        :
                        <div className="overflow-y-auto h-96">
                            <ul>
                                {
                                    reviews.map((review, index) => {
                                        return (
                                            <li key={index} className="mb-4">
                                                <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h4 className="text-lg font-bold">
                                                            {review.client.firstname}
                                                        </h4>
                                                        {
                                                            review.calification === 1 ?
                                                                <div className="flex items-center">
                                                                    <BsEmojiFrown className="text-red-500 text-2xl" />
                                                                    <p className="text-sm text-gray-500 ml-2">
                                                                        Mala
                                                                    </p>
                                                                </div>
                                                            :   review.calification === 2 ?
                                                                <div className="flex items-center">
                                                                    <BsEmojiNeutral className="text-yellow-500 text-2xl" />
                                                                    <p className="text-sm text-gray-500 ml-2">
                                                                        Regular
                                                                    </p>
                                                                </div>
                                                            :
                                                                <div className="flex items-center">
                                                                    <BsEmojiSmile className="text-green-500 text-2xl" />
                                                                    <p className="text-sm text-gray-500 ml-2">
                                                                        Buena
                                                                    </p>
                                                                </div>
                                                        }
                                                    </div>  
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm text-gray-500"> 
                                                            {review.review}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    }                 
                </div>
                </div>
            </div>
        </div>
      }
   </>         

  )
}

export default profileSeller;