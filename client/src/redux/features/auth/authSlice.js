import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  sendCode: false,
  token: null,
  loading: false,
  error: null,
  verify: false,
};

// Async thunk para enviar los datos del usuario al backend y recibir la respuesta con el token y código de verificación
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    // console.log(userData);
    const response = await axios.post("/user", userData);
    return response.data;
  }
);

// Async thunk para enviar logear al usuario
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({email,password}) => {
    // console.log(`/login?email=${email}&password=${password}`);

    const response = await axios.get(`/login?email=${email}&password=${password}`);
    return response.data;
  }
);

//Async thunk para autologear a un usuario si existe un token en el localstorage
export const autoLoginUser = createAsyncThunk(
  "auth/autoLogin",
  async (token) => {
    if (token) {
      try {
        const response = await axios.get("/autologin", {
          headers: {
            " Authorization": `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (err) {
        return err.message;
      }
    }
    return null;
  }
);

// Async thunk para enviar el código de verificación al backend y recibir la respuesta con los datos del usuario
export const verifyCode = createAsyncThunk(
  "auth/fetchUserData",
  async ({ email, code, token }) => {
    // console.log(token,email)
    const response = await axios.get(
      `/verify?email=${email}&code=${Number(code)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

// Async thunk para enviar el UID al backend para el usuario de GOOGLE y recibir datos del user creado en la base de datos
export const loginGoogle = createAsyncThunk(
  "auth/loginGoogle",
  async (uid) => {
    const response = await axios.get(`/authgoogle?uid=${uid}`);
    return response.data;
  }
)

// Async thunk para editar datos de un usuario
export const putEditUser = createAsyncThunk(
  "auth/editUser",
  async(user,{getState,dispatch}) => {
    const response = await axios.put('/edituser', user);
    const user_unverified_token = localStorage.getItem("user_verified");
    
    dispatch(autoLoginUser(user_unverified_token))
    // console.log(response.data);
    // return response.data;
  }
)
// Async thunk para deslogear al usuario
// export const logOut = createAsyncThunk(
//   "auth/logOut",
//   async(user) => {
//     console.log(user);
//     // const response = await axios.put('/logout', user);
//     // return response.data;
//   }
// )

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sendCode: (state) => {
     state.sendCode = true
  },
  logOut: (state) => {
    state.user = null
    localStorage.removeItem("user_verified")
    localStorage.removeItem("shopping_cart")
  }
  },
  extraReducers: (builder) => {
    builder
      // Acciones para enviar los datos del usuario y recibir el token y código de verificación
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.sendCode = true;
        state.token = action.payload.token;
        localStorage.removeItem("user_unverified");
        localStorage.setItem("user_unverified", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //Acciones para autoLogear a un usuario
      .addCase(autoLoginUser.rejected, (state, action) => {
        state.token = null;
        state.user = null;
        localStorage.removeItem("token");
      })
      .addCase(autoLoginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      // Acciones para enviar el código de verificación y recibir los datos del usuario
      .addCase(verifyCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        state.loading = false;
        state.sendCode = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.verify = true;
        localStorage.removeItem("user_unverified");
        localStorage.setItem("user_verified", action.payload.token);
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.sendCode = true;
      })

       // Acciones para login
       .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.sendCode = false;
        state.verify = true;
        state.user = action.payload.user;
        localStorage.setItem("user_verified", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        // console.log(action);
        state.loading = false;
        state.error = action.payload;
      })

      /*---------------GoogleLogin------------------*/
      .addCase(loginGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.verify = true;
        localStorage.setItem("user_verified", action.payload.token);
      })
      .addCase(loginGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /*---------------Edit User------------------*/
      .addCase(putEditUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(putEditUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload.user;
      })
      .addCase(putEditUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { sendCode,logOut } = authSlice.actions
export default authSlice.reducer;
