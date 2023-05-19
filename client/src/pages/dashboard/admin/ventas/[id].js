import Layout from '@/components/dashboard/admin/Layout.js';
import EnConstruccion from '../../../../components/enConstruccion';
import { useRouter } from 'next/router';

function Venta() {
    // LÓGICA DEL COMPONENTE
    const router = useRouter();

    // RENDERIZADO DEL COMPONENTE
    return (
        <Layout title="Detalle de la Venta">
            <div className='mt-8'>
                <EnConstruccion />
            </div>
            <div className='flex justify-center items-center'>
                <button 
                className='bg-verde hover:bg-verde-light text-white font-semibold text-sm py-2 px-8 rounded mt-2'
                type="button" 
                onClick={() => router.back()}
                >
                    Volver
                </button>
            </div>
        </Layout>
    )
};

export default Venta;