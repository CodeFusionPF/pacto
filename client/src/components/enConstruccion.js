import styles from "../styles/EnConstruccion.module.css";
import Image from "next/image";
import ilustracion from "../../public/image/enConstruccion.png"

const EnConstruccion = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
            <Image priority src={ilustracion} alt=""/>
            </div>
            <p className="text-center text-2xl font-medium text-gray-600 mt-8 mb-1">
                Aquí estamos construyendo
            </p>
            <p className="text-center text-2xl font-medium text-gray-600 mt-1 mb-4">
                algo genial para ti...
            </p>
        </div>
    )
};

export default EnConstruccion;