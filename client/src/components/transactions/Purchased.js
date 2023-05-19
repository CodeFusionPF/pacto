import styles from "../../styles/Purchased.module.css";
import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStateProduct } from "@/redux/features/transactions/transactionsSlice";
import ModalReview from "../ModalReview";


const Purchased = (props) => {
  const dispatch = useDispatch()
  const [stateProduct,setStateProduct] = useState({
    user:props.user,
    idOrder:props.order,
    idProduct: props.id,
    vendor: props.vendor
  })

  // Controla la renderización y el cierre del modal
  const [showModal, setShowModal] = useState(false);

  const handleSetProductsState = (event)=>{

    dispatch(updateStateProduct(stateProduct))
  }

  // Función para abrir el modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <div className={styles.wrapper}>
      <div className={styles.products}>
        <ul className={styles.info_products}>
          <li>
            <span>{`${props.name.slice(0,15)}...`}</span>
            <span>Estado: {props.state}</span>
            <span>Total: ${props.total}</span>
            <span>Cantidad: {props.amount}</span>
          </li>
        </ul>
        <div className={styles.btn}>
        {props.state === 'comprado' ? <button className={styles.confirmBtn} onClick={handleSetProductsState}>Recibido</button>: 
        <button className={styles.confirmBtn} onClick={handleOpenModal} >Calificar</button> }
        </div>
      </div>
      {
          showModal && (
            <ModalReview vendedor={stateProduct.vendor} cliente={stateProduct.user} onClose={handleCloseModal}/>
          )
      }
    </div>
  );
};


export default Purchased;
