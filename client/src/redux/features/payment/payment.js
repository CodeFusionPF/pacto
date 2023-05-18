// paymentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { autoLoginUser } from "../auth/authSlice";
import axios from "axios";

export const payment = createAsyncThunk(
  "payment",
  async (_,{getState,dispatch}) => {
    try {
     
      const token = localStorage.getItem("user_verified");
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      
      const response  = await axios.post("/payment", {}, config);
      const urlMercadoPago = response.data
      dispatch(setPaymentUrl(urlMercadoPago));
      dispatch(setStatus("succeeded"))

    } catch (error) {
      // dispatch(setError('El producto ya no está disponible en el la cantidad seleccionada'));
      // dispatch(setStatus("failed"));
      console.log(error.message);

    }
  }
);

const initialState = {
  paymentUrl: "",
  status: "idle",
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentUrl: (state, action) => {
      state.paymentUrl = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },        
});

export const { setPaymentUrl, setStatus, setError } = paymentSlice.actions;

export default paymentSlice.reducer;
