import styles from "../styles/EnConstruccion.module.css";
import Image from "next/image";
import ilustracion from "../../public/image/enConstruccion.png"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addProducts,fetchProducts } from "@/redux/features/products/productsSlice";

const EnConstruccion = () => {
     const dispatch = useDispatch()
     const state = useSelector(state => state.products);
    
    useEffect(()=>{
        fetch("http://localhost:3000/api/items")
        .then(response => response.json())
        .then(data=> dispatch(addProducts(data.products)))
    },[])


    return (
        <div className={styles.container}>
            <h1>Página en Construcción</h1>
            <div className={styles.imgContainer}>
            <Image priority src={ilustracion} alt=""/>
            </div>
        </div>
    )
}


export default EnConstruccion;