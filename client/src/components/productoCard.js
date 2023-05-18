import styles from "../styles/ProductoCard.module.css";
import Image from "next/image";
import Link from "next/link";


const ProductoCard = ({ producto }) => {

    if (!producto) {
        return <div>Cargando...</div>;
      }
    
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Link href={`productos/${producto._id}`} >
                    <Image src={producto.images[0]} alt={producto.name} className={styles.img} width="200" height="200" />
                </Link>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.nameContainer}>
                    <p>{producto.name}</p>
                </div>
                <p>{`$ ${producto.price}`}</p>
                {/* HARDCODEO DE LINK PARA EL BORRADOR INICIAL */}
                <Link href={`productos/${producto._id}`} className={styles.link}>
                    Ver Producto
                </Link>
            </div>
        </div>
    )
}

export default ProductoCard;