import React from "react";
import ReactDOM from "react-dom";
import styles from "../../styles/Orders.module.css";

const Orders = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.products}>
        <ul className={styles.info_products}>
          <li>
            {/* <span>#{props.numero + 1}</span> */}
            <span>Monto total: ${props.total}</span>
            <span>Estado: {props.state}</span>
            <span>Fecha: {props.date}</span>
            <span>{props.hora}:{props.minutos}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};


export default Orders;
