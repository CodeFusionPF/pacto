import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getOrders = createAsyncThunk("getOrders", async (id) => {
  try {
    const response = await axios.get(`/transactions?id=${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
});

export const getDetailOrder = createAsyncThunk(
  "getOrders/Detail",
  async (idOrder) => {
    try {
      const response = await axios.get(`/transactions/${idOrder}`);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
  );
  export const updateStateProduct = createAsyncThunk(
    "updateStateProduct",
    async ({idOrder,idProduct}) => {
      try {
        // console.log(idOrder,idProduct);
        const response = await axios.put(`/transactions/${idOrder}/${idProduct}`);
        

      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

const initialState = {
  orders: [],
  detailOrder: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Obtener ordenes del usuario
      .addCase(getOrders.pending, (state, action) => {})
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {})

      // Obtener detalles de una orden
      .addCase(getDetailOrder.pending, (state, action) => {})
      .addCase(getDetailOrder.fulfilled, (state, action) => {
        state.detailOrder = action.payload;
      })
      .addCase(getDetailOrder.rejected, (state, action) => {})

      // Actualizar estados de los productos de una orden
      .addCase(updateStateProduct.pending, (state, action) => {})
      .addCase(updateStateProduct.fulfilled, (state, action) => {
        state.detailOrder = action.payload;
      })
      .addCase(updateStateProduct.rejected, (state, action) => {});
  },
});

export default transactionsSlice.reducer;
