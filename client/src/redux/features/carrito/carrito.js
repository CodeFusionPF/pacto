import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { autoLoginUser } from "../auth/authSlice";
import axios from "axios";

// enviar productos
export const sendProducts = createAsyncThunk(
  "shoppingCart/sendProducts",
  async (product, { getState,dispatch }) => {
    try {
      const token = localStorage.getItem("user_verified");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

        const response = await axios.post("/shoppingcart", [product], config);

        // Guardar los productos devueltos por la API en el localStorage
        // localStorage.setItem("shopping_cart", JSON.stringify(response.data.products));

        dispatch(autoLoginUser(token))

        return response.data.products;
    } catch (error) {
      console.error(error);
      return Promise.reject(error.message)
    
    }
  }
);

//obtener productos

// export const getProducts = createAsyncThunk(
//   "shoppingCart/getProducts",
//   async (_, { getState }) => {
//     try {
//       // Obtener productos del estado del carrito
//       const products = getState().shoppingCart.products;

//       // Realizar una solicitud para obtener información actualizada sobre los productos en el carrito
//       const token = localStorage.getItem("user_verified");
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const response = await axios.get("/shoppingcart", config);

//     } catch (error) {
//       console.error(error);
//       return Promise.reject(error.message);
//     }
//   }
// );


const carritoSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {
   
    // verifyLocalStorageProducts: (state, action) => {
    //   let productsLocalStorage = JSON.parse(
    //     localStorage.getItem("shopping_cart")
    //   );
    //   state.products = productsLocalStorage;
    // },
  },
  extraReducers: (builder) => {
    builder
    //------Send Products--------
    .addCase(sendProducts.pending, (state) => {
      state.status = "loading";
      })
    .addCase(sendProducts.fulfilled, (state,action) => {
      state.status = "succeeded";
      state.products = action.payload
    })
    .addCase(sendProducts.rejected, (state, action) => {
        console.log(action)
        state.status = "failed";
        state.error = action.error.message;
      })
      //------Get Products--------
      // .addCase(getProducts.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(getProducts.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.products = action.payload;
      // })
      // .addCase(getProducts.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // });
    },
});

export const { addProduct, verifyLocalStorageProducts } = carritoSlice.actions;
export default carritoSlice.reducer;
