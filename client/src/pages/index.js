import styles from '@/styles/Home.module.css';
import Layout from '@/components/layout';
import Link from 'next/link';
import Login from '@/pages/login';
import EnConstruccion from '@/components/enConstruccion';
import Slider from '@/components/slider';
import Rewiews from '@/components/rewiewsEnConstruccion';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home() {
  return (
    <>
      <Layout title="Home">
        <Slider />
        <Rewiews/>
      </Layout>
    </>
  )
}
