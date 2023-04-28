import styles from '@/styles/Productos.module.css';
import Layout from '@/components/layout';
import Link from 'next/link';
import ProductoCard from '@/components/productoCard';


export default function Productos() {
  // LÓGICA DEL COMPONENTE
  // Se obtienen los productos del store
  // const productos = useSelector((state) => state.productos);

  // array de productos de prueba
  const productos = [
    {name: "Iphone 1", price: 130000},
    {name: "Iphone 2", price: 129000},
    {name: "Iphone 3", price: 101000},
    {name: "Iphone 4", price: 125000},
    {name: "Iphone 5", price: 125000},
    {name: "Iphone 6", price: 125000},
    {name: "Iphone 7", price: 125000},
    {name: "Iphone 8", price: 125000},
    {name: "Iphone 9", price: 125000},
    {name: "Iphone 10", price: 125000},
    {name: "Iphone 11", price: 125000},
    {name: "Iphone 12", price: 125000},
  ];



  // RENDERIZADO DEL COMPONENTE
  return (
    <>
      <Layout title="Productos">
        <div className={styles.main}>
          <h1 className={styles.title}>Productos</h1>
          <div className={styles.container}>
            <div className={styles.filterPanel}>
              <h3>FilterPanel</h3>
            </div>
            <div className={styles.listContainer}>
              {
                productos.map((prod, index) => (
                    <ProductoCard key={index} producto={prod} />
                ))
              }
            </div>
          </div>

        </div>
      </Layout>
    </>
  )
}
