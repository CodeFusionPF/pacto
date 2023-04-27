import style from '../styles/NavBar.module.css';
import Image from 'next/image';
import SearchBar from './searchbar';
import Link from 'next/link';


export default function NavBar(){

    return (
        <nav className={style.container}>
            <div className={style.logo}>
                <Image priority src="/pacto-logo.png" alt="logo" width="85" height="88"/>
            </div>

            <div className={style.menu}>
                <Image priority src="/image/menu.svg" alt="logo" width="30" height="30" />
            </div>

            <div className={style.navigation}>
                <div>
                    <SearchBar />
                </div>
                <div className={style.links}>
                    <button className={style.btn}>Nosotros</button>
                    <button className={style.btn}>Categorias</button>
                    <button className={style.btn}>Ofertas</button>
                    <button className={style.btn}>Formas de pago</button>
                    <button className={style.btn}>¿Necesitas ayuda?</button>
                </div>
            </div>

            <div className={style.user}>
                <button>
                    <Link href="/login">
                        <Image priority src="/image/user.svg" alt="user" width="35" height="35"/>
                    </Link>
                </button>
                <button>
                    <Image priority src="/image/cart.svg" alt="cart" width="35" height="35"/>
                </button>
            </div>

        </nav>
    )
}