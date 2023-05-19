import React from "react";
import styles from "../styles/FooterLinks.module.css";
import Image from "next/image";
import logo from "../../public/pacto-logo.png";
import { FaLinkedin, FaInstagram, FaTiktok } from "react-icons/fa";

export default function FooterLinks() {
  return (
    <div className={styles.container}>
      <div className={styles.contact}>
        {/* info empresa */}
        <div className={styles.data_company}>
          <Image src={logo} width={"150"} height={"200"} />
          <p>
            Nuestra empresa, <strong>H2H</strong>, se estableció en 2023 con el
            objetivo de mejorar la experiencia de compra de artículos de todo
            tipo. Desde entonces, hemos brindado servicio a más de <strong>500,000</strong> clientes que confían en nuestra plataforma.
          </p>
        </div>

        <div className={styles.support}>
          <ul>
            <h5>Servicios</h5>
            <li>Términos y Condiciones</li>
            <li>Privacidad</li>
            <li>Ayuda</li>
          </ul>
        </div>
        <div className={styles.support}>
          <ul>
            <h5>Soporte</h5>
            <li>Términos y Condiciones</li>
            <li>Privacidad</li>
            <li>Ayuda</li>
          </ul>
        </div>
      </div>

      <hr style={{ width: '96%', borderTop: '1px solid #9362D3' }} />

      <div className={styles.rigth_icons}>
        {/* derechos reservados */}
        <div className={styles.rigth}>
          <p>
            © Creado en Colombia para enriquecer la vida de las personas en
            Latinoamérica a través de una experiencia única de compras.
          </p>
        </div>

        {/* iconos redes sociales */}
        <div className={styles.icons}>
          <FaInstagram />
          <FaLinkedin />
          <FaTiktok />
        </div>
      </div>
    </div>
  );
}
