import style from '../styles/NavBar.module.css';
import Image from 'next/image';
import SearchBar from './searchbar';
import Link from 'next/link';
import { useSelector ,useDispatch } from 'react-redux';
import { openMenu } from '@/redux/features/menu/menuSlice';
import { useEffect } from 'react';


export default function NavBar(){

    const { isOpen } = useSelector(state => state.menu);
    const  userState  = useSelector(state => state.user);

    const  shoppingCart  = useSelector(state => state.user.user?.shoppingCart?.products);

    const dispatch = useDispatch();

    const handlerOpenMenu = () => {
        dispatch(openMenu()); 
    };

    return (
        <nav className={style.container}>
            <div className={style.logo}>
                <Link href={"/"}>
                    <Image priority src="/pacto-logo.png" alt="logo" width="140" height="140"/>
                </Link>
            </div>

            <div className={style.menu} onClick={handlerOpenMenu}>
                <Image priority src="/image/menu.svg" alt="logo" width="30" height="30" />
            </div>

            <div className={style.navigation}>
                <div>
                    <SearchBar />
                </div>
                    {
                    !isOpen && 
                    <div className={style.links}>
                        <Link href="/nosotros" className={style.link}>
                            <button className={style.btn}>Nosotros</button>
                        </Link>
                        <Link href="/productos" className={style.link}>
                            <button className={style.btn}>Productos</button>
                        </Link>
                        {
                            !userState.user ? 
                            <Link href="/login" className={style.link}>
                                <button className={style.btn}>Vender</button>
                            </Link> 
                            :
                            <Link href="/sellProduct" className={style.link}>
                                <button className={style.btn}>Vender</button>
                            </Link>
                        }
                        <Link href="/faqs" className={style.link}>
                            <button className={style.btn}>¿Necesitas ayuda?</button>
                        </Link>
                        {
                            userState.user?.role?.role === 'admin' &&

                            <Link href="/dashboard/admin" className={style.link}>
                                <button className={style.btn}>Admin Panel</button>
                            </Link>
                        }
                    </div>
                    }
            </div>

            <div className={style.user}>
                {
                    !isOpen &&
                    (
                     !userState.user ? 
                        <div className={style.userPerfil}>
                            <button className={style.red}>
                                <Link href="/login">
                                    <Image priority src="/image/user.png" alt="user" width="35" height="35"/>
                                </Link>
                            </button> 
                        </div>
                            :
                            <div className={style.userPerfil}>
                                <button className={style.red}>
                                <Link href="/profileUser">
                                    <Image priority src="/image/user.png" alt="user" width="35" height="35"/>
                                </Link>
                                </button>
                                <h6>Bienvenido {userState.user.firstname}!</h6> 
                            </div>
                    )
                }
                <div className={style.shoppingCart}>
                <button>
                    <Link href="/cart/detailCart">
                        <Image priority src="/image/cart.png" alt="cart" width="35" height="35"/>
                    </Link>
                </button>
                
                {shoppingCart && shoppingCart.length > 0 ? <p>{shoppingCart.length}</p> : null}
                </div>
            </div>

        </nav>
    )
}