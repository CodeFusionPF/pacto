import '@/styles/globals.css'
import { Provider } from 'react-redux';
import store from '../redux/store'
import axios from "axios";
import { useEffect } from 'react';
import { autoLoginUser,verifyCode } from '@/redux/features/auth/authSlice';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { verifyLocalStorageProducts } from '@/redux/features/carrito/carrito';
axios.defaults.baseURL = 'https://hand2hand.up.railway.app/';
//axios.defaults.baseURL = 'http://localhost:3001';


export default function App({ Component, pageProps }) {

     const navigate = useRouter();

     useEffect(() => {
      async function fetchData() {
        if (typeof window !== 'undefined') {
          //token usuario verificado
          const user_verified_token = localStorage.getItem("user_verified");
          //token usuario no verificado
          const user_unverified_token = localStorage.getItem("user_unverified");
          //data local del carrito del usuario
          const shopping_cart = localStorage.getItem("shopping_cart");
     
      
          if (user_verified_token){
           await store.dispatch(autoLoginUser(user_verified_token))
           if(navigate.pathname === '/login') navigate.push('/')
          }
          
          if(user_unverified_token){
              await store.dispatch(verifyCode({token  :user_unverified_token}))
    
              navigate.push('/signup')
              
          }
          
          // if(shopping_cart){
          //   store.dispatch(verifyLocalStorageProducts())
          // }
        }
      }
    
      fetchData();
    }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

//Aca se usaria el Provider para el redux Toolkit
