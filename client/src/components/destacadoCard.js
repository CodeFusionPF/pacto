import styles from "../styles/DestacadoCard.module.css";
import Image from "next/image";

const DestacadoCard = ({ producto }) => {

    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src={producto.images[0]} alt={producto.name} width="400" height="285"/>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.nameContainer}>
                    <p>{producto.name}</p>
                </div>
                <p>{`$ ${producto.price}`}</p>
            </div>
            <button className={styles.buyNowButton} title="Comprar Ahora">
                Comprar Ahora
            </button>
        </div>
    )
}

export default DestacadoCard;