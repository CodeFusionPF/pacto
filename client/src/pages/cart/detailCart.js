
import Layout from "../../components/layout";
import Link from "next/link";
import style from "../../styles/cart/car.module.css";
import Image from "next/image";
import ProductoCard from "../../components/cart/productCart";
import { useSelector } from "react-redux";

export default function car() {

  const shoppingCart = useSelector((state)=> state.user?.user?.shoppingCart);
  let totalPrice = null;
  console.log(shoppingCart);

  return (
    <>
    {shoppingCart?.products?.length > 0 ? <Layout>
        <div className={style.container}>
            <p className={style.titleCart}>Carrito de compras</p><hr/>

            {shoppingCart?.products.length > 0 && shoppingCart.products.map(item=>{
              const {_id,name,images,price,ammount} = item.product;

              totalPrice = price * item.ammount;
              
              return (<ProductoCard name= {name} images={images} price={price} ammount={ammount} total={totalPrice}/>)
            })}

            {/*  Costo envío*/}
            {/* <div className={style.shipping}>
              <h5>Costo de envío</h5>
              <p>$500</p>
            </div> */}

             {/* total producto */}
             {/* <div className={style.shipping}>
              <h5>Total con envío</h5>
              <p>{`$ ${totalPrice}`}</p>
            </div> */}
            
            {/* Sección para los botones de submit y cancelar */}
            <div className={style.buttons}>
                <Link href="/">
                    <button className={style.buttonCancel}>Cancelar</button>
                </Link>
                <Link href="/cart/shipmentCart">
                    <button className={style.buttonContinue}>Continuar</button>
                </Link>
            </div>
          </div>    
     
      </Layout>: <p>Cargando carrito...</p> }
      
    </>
)}