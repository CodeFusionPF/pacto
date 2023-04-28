import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    msg:'',
    user:'',
    token:'',
    loading:false,
    error:''
}

export const signUpUser = createAsyncThunk('signupuser',async(body)=>{
   const respuesta =  await axios.post("http://localhost:3000/api/signup",body);
   return respuesta.data
})

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
      
    },
    //reducer async
    extraReducers:{
        [signUpUser.pending]: (state,action)=>{
            state.loading = true
        },
        [signUpUser.fulfilled]: (state,{payload:{error,msg}})=>{
            state.loading = false;
            if(error){
                state.error = error
            }else{
                state.msg = msg
            }
        },
        [signUpUser.rejected]: (state,action)=>{
            state.loading = true
            
        }
    }
})


// export const {addToken,addUser,logout} = authSlice.actions
export default authSlice.reducer;