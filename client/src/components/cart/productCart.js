import style from "../../styles/cart/car.module.css";
import Image from "next/image";

export default function productCart(props) {
    const {images,name,price,ammount, total} = props;
    return (
        <>
            <div className={style.products}>
                <Image className={style.productImage} src={images[0]} width={100} height={100} />
                <div className={style.productInfo}>
                    <div className={style.productDetail}>
                        <p>{`${name.slice(0,10)}...`}</p>
                        <p>{`$ ${price}`}</p>

                    </div>

                </div>
                        <p>{`Produtos: ${ammount}`}</p>

                    {/* <div>
                        <div className={style.quantity}>
                            <Image className={style.quantityImage} src="/image/menos.png" width={10} height={10} />
                            <input type="number" className={style.inputQuantity} min="1" max="100" />
                            <Image className={style.quantityImage} src="/image/mas.png" width={10} height={10} />
                        </div>
                        <p className={style.deleteProduct}>Eliminar</p>
                    </div> */}
                    <div className={style.totalProduct}> 
                        <p>{`$ ${total}`}</p>
                    </div>
            </div>
            
        </>
    )
}
