import styles from "@/styles/Productos.module.css";
import Layout from "@/components/layout";

import Image from "next/image";
import filtersIcon from "../../../public/image/filtersIcon.png";

import ProductoCard from "@/components/productoCard";
import FilterPanel from "@/components/filterPanel";
import SortComponent from "@/components/sortComponent";
import Paginado from "@/components/paginado";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "@/redux/features/products/productsSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  setFilters,
  setOrderBy,
  setPage,
} from "@/redux/features/products/productsSlice";
import ProductList from "@/components/ProductList";
import HearderProducts from "@/components/HearderProducts";
import FooterLinks from "@/components/FooterLinks";

export default function Productos() {
  // LÓGICA DEL COMPONENTE
  const { cantidad } = useSelector((state) => state.products.productList);

  // Estado local para manejar la visibilidad del panel de filtros en mobile
  const [showFilters, setShowFilters] = useState(false);

  // Función para cambiar la visibilidad del panel de filtros en mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // RENDERIZADO DEL COMPONENTE
  return (
    <>
      <Layout title="Productos">
        <div className={styles.container}>
          {/* Sección superior que sólo aparece en mobile */}
          <div className={styles.mobileControllers}>
            <button
              className={styles.mobileFiltersButton}
              onClick={toggleFilters}
            >
              <span>
                <Image
                  src={filtersIcon}
                  alt="Icono de filtros"
                  className={styles.filtersIcon}
                />
              </span>
              Filtros
            </button>
          </div>

          {/* Sección para el título de la página de la página */}
          {/* <h1 className={styles.title}>Productos</h1> */}
          <HearderProducts></HearderProducts>

          {/* Sección para el contenido ppal de la página */}
          <div className={styles.main}>
            {/* Panel de filtrado */}
            {/* Por props se pasa el estado local vinculado y la función para modificarlo */}
            <FilterPanel
              isVisible={showFilters}
              setVisibility={toggleFilters}
            />

            {/* Contenedor de la info de los productos */}
            <div className={styles.productsContainer}>
              {/* Header del contenedor de la  info de los productos */}
              <div className={styles.prodContainerHeader}>
                <p className={styles.totalProducts}>
                  Total Productos: {cantidad}
                </p>
                <SortComponent />
              </div>

              {/* Contenedor para la lista de productos */}
              {/* {<div className={styles.productsList}>
                {products.items?.map((prod, index) => (
                  <ProductoCard key={index} producto={prod} />
                ))}
              </div>} */}
              <div>
                <ProductList />
              </div>

              <div className={styles.prodContainerFooter}>
                <Paginado />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
