import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import style from "../styles/Login.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/router";

export default function login() {
  const dispatch = useDispatch();

  const [signUp, setSignup] = useState({
    email: "",
    password: "",
    confirmarPass: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignup({
      ...signUp,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSignup({
      ...signUp,
      email: "",
      password: "",
      confirmarPass: "",
    });
    dispatch(signUpUser(signUp));
  };

  return (
    <div className={style.login}>
      <Head>
        <title>PACTO | Registro</title>
        <meta name="description" content="PACTO" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/pacto-logo.png" />
      </Head>

      <div className={style.containerLogin}>
        <div>
          <Link href="/">
            <Image
              className={style.logo}
              priority
              src="/pacto-logo.png"
              alt="logo"
              width="85"
              height="88"
            />
          </Link>
          <h3>Crea tu cuenta</h3>
          <div className={style.sign}>
            <p>¿Ya tienes una cuenta?</p>
            <Link href="/login">
              <span>Inicia Sesión</span>
            </Link>
          </div>
        </div>

        <form className={style.form__Login} onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            value={signUp.email}
            name={"email"}
            type="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          />

          <label>Contraseña:</label>
          <input
            value={signUp.password}
            name={"password"}
            type="password"
            placeholder="Ingresa tu contraseña"
            onChange={(e) => handleChange(e)}
          />

          <label>Contraseña:</label>
          <input
            value={signUp.confirmarPass}
            name={"confirmarPass"}
            type="password"
            placeholder="Repite tu contraseña"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Registrate</button>
        </form>
      </div>
    </div>
  );
}
