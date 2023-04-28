// PÁGINA PARA PROBAR COMPONENTES
// SÓLO PARA DESARROLLO
import styles from '@/styles/Home.module.css';
import Layout from '@/components/layout';
import Link from 'next/link';
import Login from '@/pages/login';
import ProductoCard from '@/components/productoCard';

export default function Prueba() {
  return (
    <>
      <Layout title="Home">
        <ProductoCard />
      </Layout>

    </>
  )
}