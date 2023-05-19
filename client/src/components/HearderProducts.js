import React from "react";
import styles from "../styles/HeaderProduct.module.css";
import Image from "next/image";
import header1 from "../../public/image/header1.svg";
import header2 from "../../public/image/header2.svg";
function HearderProducts() {
  return (
    <div className={styles.container}>
      <div className={styles.images}>
        <Image src={header1}/>
      <div className={styles.text}>
      <h3>Descubre nuestra amplia selección de productos</h3>
      <p>¡Encuentra lo que necesitas para tu vida diaria!</p>
      </div>
        <Image src={header2}/>
      </div>
    </div>
  );
}

export default HearderProducts;
