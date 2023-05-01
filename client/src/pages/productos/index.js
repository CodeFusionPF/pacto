import styles from "@/styles/Productos.module.css";
import Layout from "@/components/layout";


import ProductoCard from "@/components/productoCard";
import FilterPanel from "@/components/filterPanel";
import SortComponent from "@/components/sortComponent";
import Paginado from "@/components/paginado";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "@/redux/features/products/productsSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { setFilters, setOrderBy, setPage } from "@/redux/features/products/productsSlice";
import ProductList from "@/components/ProductList";



export default function Productos() {
   const { cantidad } = useSelector(state => state.products.productList);

  // RENDERIZADO DEL COMPONENTE
  return (
    <>
      <Layout title="Productos">

        <div className={styles.container}>
          {/* Sección superior que sólo aparece en mobile */}
          <div className={styles.mobileControllers}>
            <button className={styles.mobileFiltersButton}>Filtros</button>
          </div>

          {/* Sección para el título de la página de la página */}
          <h1 className={styles.title}>Productos</h1>
          
          {/* Sección para el contenido ppal de la página */}
          <div className={styles.main}>

            {/* Panel de filtrado */}
            <FilterPanel />
              
            {/* Contenedor de la info de los productos */}
            <div className={styles.productsContainer}>

              {/* Header del contenedor de la  info de los productos */}
              <div className={styles.prodContainerHeader}>
                <p className={styles.totalProducts}>Total Productos: {cantidad}</p>
                <SortComponent />
              </div>

              {/* Contenedor para la lista de productos */}
              {/* {<div className={styles.productsList}>
                {products.items?.map((prod, index) => (
                  <ProductoCard key={index} producto={prod} />
                ))}
              </div>} */}
              <div>
                <ProductList/>
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
