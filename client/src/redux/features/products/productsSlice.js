import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

// esta funcion la intente con el modulo thunk
export const fetchProducts =  async () => {
  
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action) => {
       state.items = action.payload;
    },

    //actions
  },
});

//actions
export const { addProducts } = productsSlice.actions;
export default productsSlice.reducer;
