import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './features/products/productsSlice';
import menuReducer from './features/menu/menuSlice';
import authReducer from "./features/auth/authSlice";

const store = configureStore({
    reducer:{
        products: productsReducer,
        menu: menuReducer,
        user:authReducer
    }
})

export default store;
