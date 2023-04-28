import styles from "../styles/Destacados.module.css";
import Image from "next/image";
import DestacadoCard from '@/components/destacadoCard';

// HARD CODEO EL PRODUCTO PARA PROBAR EL COMPONENTE
import img1 from '../../public/image/products/p1_1.jpg';
import img2 from '../../public/image/products/p1_2.jpg';
import img3 from '../../public/image/products/p1_3.jpg';
import img4 from '../../public/image/products/p1_4.jpg';
const producto = {
    "id": 1,
    "name": "Smartphone Samsung Galaxy S3 Desbloqueado 16GB Blanco Android 8MP Cámara 1GB RAM",
    "images": [
        img1, img2, img3, img4
    ],
    "description": "El dispositivo está en perfecto estado de funcionamiento, aunque tiene algunos detalles. Por favor observa con detenimiento las fotografías antes de comprar.\nRed\n--------------\nEste dispositivo está desbloqueado para trabajar con todas las redes de Colombia. Verifica la compatibilidad si compras fuera de Colombia.",
    "state": "Bueno",
    "price": 250000,
    "active": true,
    "label": "Oferta",
    "stock": 1,
    "user": "Juan Pérez",
    "send": null,
    "category": "Celulares",
    "questions": null,
    "reviews": null
}


const Destacados = () => {
    return (
        <div className={styles.container}>
            <h2>Destacados</h2>
            <button className={styles.verTodosButton}>Ver todos</button>
            <div className={styles.cardsContainer}>
                <DestacadoCard producto={producto} />
                <DestacadoCard producto={producto} />
                <DestacadoCard producto={producto} />
                <DestacadoCard producto={producto} />
            </div>
        </div>
    )
}

export default Destacados;