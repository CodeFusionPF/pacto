import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import style from "../styles/Login.module.css"
import { useDispatch,useSelector } from "react-redux"
import { useState } from "react"
import { loginUser } from "../redux/features/auth/authSlice"
import { useEffect } from "react"
import { autoLoginUser, loginGoogle } from "../redux/features/auth/authSlice"
import { useRouter } from "next/router"
import { GoogleButton } from 'react-google-button';
import { auth } from "../components/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';



export default function login(){
    const dispatch = useDispatch()
    const navigate = useRouter()
    const user = useSelector((state)=> state.user)

    /*---------------------------GOOGLE FIREBASE---------------------------*/
    const googleAuth = new GoogleAuthProvider();
    const [userGoogle, setUserGoogle] = useAuthState(auth);

    const authGoogle = async () => {
        const response = await signInWithPopup(auth, googleAuth);
        await dispatch(loginGoogle(response.user.uid))
    };

    /*----------------------------------------------------------------------*/

    useEffect(()=>{
        async function fetchData() {
            if (typeof window !== 'undefined') {
              const user_verified_token = localStorage.getItem("user_verified");
         
              if (user_verified_token){
               await dispatch(autoLoginUser(user_verified_token))
               if(navigate.pathname === '/login') navigate.push('/')
              }
           
            }
          }
        
          fetchData();
    },[user])

    const [login,setLogin] = useState({
        email:'',
        password:'',

    });

    const handleChange = (event)=>{
        const {name, value} = event.target;
        
        setLogin({
            ...login,
            [name]:value
        })
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        setLogin({
            ...login,
            email:'',
            password:'',
        })
        dispatch(loginUser(login))
    }


    return (
        <div className= {style.login}>
            <Head>
                <title>H2H | Login</title>
                <meta name="description" content="H2H" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/pacto-logo.png" />
            </Head>

            <div className= {style.containerLogin}>
                <div>
                    <Link href="/">
                        <Image className= {style.logo} priority src="/pacto-logo.png" alt="logo" width="140" height="140"/>
                    </Link>
                    <h3>¡Hola! Para seguir, ingresa tu email y contraseña</h3>
                    <div className={style.sign}>
                        <p>¿Nuevo usuario?</p>
                        <Link href="/signup">
                            <span>Registrate</span>
                        </Link>
                    </div>
                    <div className={style.google} >
                        <GoogleButton type='light' onClick={authGoogle}/>
                    </div>
                </div>

                
                    <form className={style.form__Login} onSubmit={handleSubmit}>
                        <label>Email:</label>
                        <input className={style.inputs} onChange={(e)=> handleChange(e)} value={login.email}  name={"email"} type="email" placeholder="Email" />

                        <label>Contraseña:</label>
                        <input className={style.inputs} onChange={(e)=> handleChange(e)} value={login.password} name={"password"} type="password" placeholder="Contraseña" />

                        <button type="submit">Iniciar Sesión</button>
                    </form>
                    <Link href="/forgotpass">
                        <span className={style.forgetPass}>¿Olvidaste tu contraseña?</span>
                    </Link>
            </div>

        </div>
    )
}

