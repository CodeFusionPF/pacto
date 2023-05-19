import styles from "../styles/Destacados.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from 'react-redux';
import DestacadoCard from '@/components/destacadoCard';
import { getDestacados } from "../api/productsApi";
import { useEffect, useState } from "react";


const Destacados = () => {
    // LÓGICA DEL COMPONENTE
    // Productos destacados de la BD
    const [destacados, setDestacados] = useState([]);

    useEffect(() => {
        const fetchDestacados = async () => {
            const destacados = await getDestacados();
            setDestacados(destacados);
        };

        fetchDestacados();
    }, []);


    // RENDERIZACIÓN DEL COMPONENTE
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Productos Destacados</h2>
            <div className={styles.cardsContainer}>
                {
                destacados.map((producto, index) => (
                    <DestacadoCard key={index} producto={producto} />
                ))
                }
            </div>
        </div>
    )
}

export default Destacados;