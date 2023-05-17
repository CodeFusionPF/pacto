// PÁGINA PARA PROBAR COMPONENTES
// SÓLO PARA DESARROLLO
import styles from '@/styles/Home.module.css';
import React, {useState, useEffect} from 'react';
import Layout from '@/components/layout';
import ModalReview from '@/components/ModalReview';

export default function Prueba() {
  // LÓGICA DEL COMPONENTE
  
  // Controla la renderización y el cierre del modal
  const [showModal, setShowModal] = useState(false);
  const vendedor = {_id: "646287c2bb3f562f0379c626", firstname: "Marta", lastname: "Fagúndez"};
  const cliente = {_id:"64628736c1fb5410012cb137", firstname: "Julian", lastname: "Alvarez"};

  // Función para abrir el modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };


  // RENDERIZADO DEL COMPONENTE
  return (
    <>
      <Layout title="Home">

        <div className='flex w-full items-center justify-center h-40'>
          <button
            className="bg-verde text-white font-bold py-2 px-4 rounded"
            onClick={handleOpenModal}
          >
            Calificar
          </button>
        </div>

        {
          showModal && (
            <ModalReview vendedor={vendedor} cliente={cliente} onClose={handleCloseModal}/>
          )
        }
      </Layout>

    </>
  )
}