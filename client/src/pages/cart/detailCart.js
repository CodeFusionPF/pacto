import style from "../../styles/cart/car.module.css";
import Layout from "../../components/layout";
import Link from "next/link";
import Image from "next/image";
import ProductoCard from "../../components/cart/productCart";
import { useSelector } from "react-redux";
import notFound from "../../../public/image/NotFound.png"

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
              
              return (<ProductoCard name= {name} images={images} price={price} ammount={item.ammount} total={totalPrice}/>)
            })}
            <div className={style.buttons}>
                <Link href="/">
                    <button className={style.buttonCancel}>Cancelar</button>
                </Link>
                <Link href="/cart/shipmentCart">
                    <button className={style.buttonContinue}>Continuar</button>
                </Link>
            </div>
          </div>    
     
      </Layout>:
      //carrito vacio
      <Layout>
      <div className={style.container}>
          <p className={style.titleCart}>Carrito de compras</p><hr/>
          <Image src={notFound}/>
          <div className={style.buttons}>
              <Link href="/productos">
                  <button className={style.buttonCancel}>Agregar productos</button>
              </Link>
          </div>
        </div>    
   
    </Layout>
      
      
      
      }
      
    </>
)}