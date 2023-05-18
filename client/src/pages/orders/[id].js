import style from "../../styles/Orders.module.css"
import Layout from "@/components/layout";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Purchased from "@/components/transactions/Purchased";
import { getDetailOrder } from "@/redux/features/transactions/transactionsSlice";
import { useRouter } from "next/router";

function DetailOrder() {
  const productsOrder = useSelector((state)=> state.orders.detailOrder)
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query



  useEffect(() => {

    id ? dispatch(getDetailOrder(id)): null;

  }, []);




  return (
    <Layout>
    {productsOrder?.length ? productsOrder.map((order) => (
      <React.Fragment key={order.id}>
          {order.products.map((product) => (
          <Purchased
            name={product.product.name}
            state={product.state}
            key={product._id}
            id={product.product._id}
            total={product.product.price * product.ammount}
            amount={product.ammount}
            order={order._id}
            user={order.user}
            vendor={product.product.user}
          />
        ))}
      </React.Fragment>
    )) : null}
  </Layout>
  );
}


export default DetailOrder;
