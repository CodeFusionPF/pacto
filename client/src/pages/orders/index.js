import styles from "../../styles/Orders.module.css";
import Layout from "@/components/layout";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Orders from "@/components/transactions/Orders";
import { getOrders } from "@/redux/features/transactions/transactionsSlice";

function Index() {
  const dispatch = useDispatch()
  
  const id = useSelector((state)=> state.user?.user?._id);
  const orders = useSelector((state)=> state.orders.orders);
  console.log(orders);

  useEffect(() => {
    //enviar productos al back
    // console.log(purchased)
    id ? dispatch(getOrders(id)): null;
    
  }, [id]);

  const products = [
    {
      _id: "6463037a29a00d1d8dc59706",
      user: "646301bb29a00d1d8dc596cb",
      state: 'en curso',
      time: "2023-5-16",
      total: 50000
    },
    {
      _id: "6463037a29a00d1d8dc59706",
      user: "646301bb29a00d1d8dc596cb",
      state: 'en curso',
      time: "2023-5-16",
      total: 50000
    },
    {
      _id: "6463037a29a00d1d8dc59706",
      user: "646301bb29a00d1d8dc596cb",
      state: 'en curso',
      time: "2023-5-16",
      total: 50000
    },
  ];

  return (
    <Layout>
     {orders ? orders.map((order,index) => {
        const [fecha, horaCompleta] = order.creationdate.split('T');
        const [hora, minutos, segundos] = horaCompleta.split(':');
        
        return (
          <Link href={`/orders/${order._id}`} key={order._id}>
            <Orders key={order._id} user={order.user} state={order.state} date={fecha} hora={hora} minutos={minutos} numero={index} total={order.totalprice}/>
          </Link>
        );
      }): null}

    </Layout>
  );
}


export default Index;
